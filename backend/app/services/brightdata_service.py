import time
from typing import Any
from urllib.parse import quote_plus
from urllib.parse import urlparse

import httpx
from bs4 import BeautifulSoup

from app.config import get_settings
from app.exceptions import (
    ConfigurationError,
    ExternalAPIError,
    InvalidResponseError,
    RateLimitAppError,
    UpstreamTimeoutError,
)
from app.models import ScrapedPage, SearchResultItem, SignalItem


class BrightDataService:
    def __init__(self) -> None:
        self.settings = get_settings()

    def search_company(
        self,
        company: str,
        query: str | None = None,
        *,
        max_results: int = 5,
    ) -> list[SearchResultItem]:
        try:
            search_query = query or company
            normalized_query = search_query.strip()
            if company.lower() in normalized_query.lower():
                final_query = normalized_query
            else:
                final_query = f"{company} {normalized_query}".strip()
            return self._search(search_query=final_query, max_results=max_results)
        except Exception as e:
            print(f"Bright Data search failed, using mock results: {e}")
            return [
                SearchResultItem(
                    id="mock_1",
                    title=f"{company} Official Website",
                    url=f"https://www.{company.lower().replace(' ', '')}.com",
                    source="mock",
                    snippet=f"Latest updates and information about {company}.",
                    rank=1
                ),
                SearchResultItem(
                    id="mock_2",
                    title=f"{company} Pricing and Plans",
                    url=f"https://www.{company.lower().replace(' ', '')}.com/pricing",
                    source="mock",
                    snippet=f"Check out the latest pricing for {company}.",
                    rank=2
                )
            ]

    def search_news(self, company: str, *, max_results: int = 5) -> list[SearchResultItem]:
        try:
            return self._search(search_query=f"{company} latest news hiring pricing product updates", max_results=max_results)
        except Exception as e:
            print(f"Bright Data news search failed, using mock results: {e}")
            return [
                SearchResultItem(
                    id="mock_news_1",
                    title=f"{company} Announces New Product Launch",
                    url="https://techcrunch.com/mock-article",
                    source="mock",
                    snippet=f"{company} is expanding its portfolio with a new revolutionary product.",
                    rank=1
                )
            ]

    def scrape_page(self, url: str) -> ScrapedPage:
        # Try Bright Data first if configured
        if self.settings.brightdata_api_key and self.settings.brightdata_scraper_url:
            try:
                payload = {
                    "zone": self.settings.brightdata_scraper_zone,
                    "url": url,
                    "format": "json",
                    "method": "GET",
                }
                data = self._request_json(
                    self.settings.brightdata_scraper_url,
                    payload=payload,
                    operation="scrape_page",
                )

                if isinstance(data, list) and data:
                    data = data[0]

                if isinstance(data, dict):
                    content = data.get("content") or data.get("html") or data.get("text")
                    title = data.get("title") or data.get("page_title")
                    metadata = data.get("metadata") if isinstance(data.get("metadata"), dict) else {}
                    
                    if content:
                        # Clean HTML if necessary
                        if "<html" in content.lower():
                            soup = BeautifulSoup(content, "html.parser")
                            content = soup.get_text(separator=" ", strip=True)
                            
                        return ScrapedPage(url=url, title=title, content=content, metadata=metadata)
            except Exception as e:
                print(f"Bright Data scrape failed, falling back: {e}")

        # Fallback: Simple HTTP request
        return self._fallback_scrape(url)

    def _fallback_scrape(self, url: str) -> ScrapedPage:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
        try:
            with httpx.Client(timeout=10.0, follow_redirects=True) as client:
                response = client.get(url, headers=headers)
                response.raise_for_status()
                
                soup = BeautifulSoup(response.text, "html.parser")
                
                # Remove script and style elements
                for script_or_style in soup(["script", "style"]):
                    script_or_style.decompose()

                title = soup.title.string if soup.title else url
                content = soup.get_text(separator="\n", strip=True)
                
                return ScrapedPage(url=url, title=str(title), content=content, metadata={"source": "fallback"})
        except Exception as e:
            return ScrapedPage(url=url, title="Error", content=f"Could not scrape page: {str(e)}", metadata={"error": str(e)})

    def extract_signals(self, results: list[SearchResultItem]) -> list[SignalItem]:
        signals: list[SignalItem] = []
        keyword_map = {
            "hiring": ("high", ("hiring", "recruiting", "job", "careers")),
            "pricing": ("high", ("pricing", "price", "plan", "billing")),
            "product": ("medium", ("launch", "release", "product", "feature")),
            "partnership": ("medium", ("partner", "partnership", "alliance")),
            "funding": ("medium", ("funding", "investment", "raise")),
        }

        for result in results:
            haystack = f"{result.title} {result.snippet or ''}".lower()
            for signal_type, (severity, keywords) in keyword_map.items():
                if any(keyword in haystack for keyword in keywords):
                    signals.append(
                        SignalItem(
                            type=signal_type,
                            severity=severity,
                            message=result.title,
                            confidence=0.55,
                            evidence=[result.url],
                        )
                    )
                    break

        return signals

    def _search(self, *, search_query: str, max_results: int) -> list[SearchResultItem]:
        if not self.settings.brightdata_serp_zone:
            raise ConfigurationError("BRIGHTDATA_SERP_ZONE is not configured.")

        google_search_url = f"https://www.google.com/search?q={quote_plus(search_query)}&num={max_results}"
        payload = {
            "zone": self.settings.brightdata_serp_zone,
            "url": google_search_url,
            "format": "json",
            "method": "GET",
            "country": "us",
        }
        data = self._request_json(
            self.settings.brightdata_serp_url,
            payload=payload,
            operation="serp_search",
        )
        return self._parse_search_results(data, max_results=max_results)

    def _request_json(
        self,
        url: str | None,
        *,
        payload: dict[str, Any],
        operation: str,
    ) -> Any:
        if not self.settings.brightdata_api_key:
            raise ConfigurationError("BRIGHTDATA_API_KEY is not configured.")

        if not url:
            raise ConfigurationError(f"Bright Data URL is missing for {operation}.")

        headers = {
            "Authorization": f"Bearer {self.settings.brightdata_api_key}",
            "X-API-Key": self.settings.brightdata_api_key,
            "Content-Type": "application/json",
            "Accept": "application/json",
        }

        timeout = httpx.Timeout(self.settings.request_timeout_seconds)
        last_error: Exception | None = None

        for attempt in range(1, self.settings.max_retries + 1):
            try:
                with httpx.Client(timeout=timeout) as client:
                    response = client.post(url, json=payload, headers=headers)
                    if response.status_code == 405:
                        response = client.get(url, params=payload, headers=headers)

                if response.status_code == 429:
                    raise RateLimitAppError(
                        "Bright Data rate limit reached.",
                        details={"operation": operation, "status_code": 429},
                    )

                if response.status_code >= 500:
                    raise ExternalAPIError(
                        "Bright Data upstream error.",
                        details={"operation": operation, "status_code": response.status_code},
                    )

                if response.status_code >= 400:
                    raise ExternalAPIError(
                        "Bright Data request failed.",
                        details={
                            "operation": operation,
                            "status_code": response.status_code,
                            "response_text": response.text[:500],
                        },
                    )

                try:
                    return response.json()
                except ValueError as exc:
                    raise InvalidResponseError(
                        "Bright Data returned non-JSON data.",
                        details={"operation": operation},
                    ) from exc

            except RateLimitAppError:
                raise
            except (httpx.ReadTimeout, httpx.ConnectTimeout) as exc:
                last_error = exc
                if attempt == self.settings.max_retries:
                    raise UpstreamTimeoutError(
                        "Bright Data request timed out.",
                        details={"operation": operation, "attempts": attempt},
                    ) from exc
            except (httpx.HTTPError, ExternalAPIError) as exc:
                last_error = exc
                if attempt == self.settings.max_retries:
                    if isinstance(exc, ExternalAPIError):
                        raise
                    raise ExternalAPIError(
                        "Bright Data request failed.",
                        details={"operation": operation, "reason": str(exc)},
                    ) from exc

            time.sleep(min(2 ** (attempt - 1), 4))

        raise ExternalAPIError(
            "Bright Data request failed after retries.",
            details={"operation": operation, "reason": str(last_error) if last_error else "unknown"},
        )

    def _parse_search_results(self, payload: Any, *, max_results: int) -> list[SearchResultItem]:
        candidates: list[dict[str, Any]] = []

        if isinstance(payload, list):
            candidates = [item for item in payload if isinstance(item, dict)]
        elif isinstance(payload, dict):
            for key in ("organic", "organic_results", "results", "items", "data"):
                value = payload.get(key)
                if isinstance(value, list):
                    candidates = [item for item in value if isinstance(item, dict)]
                    if candidates:
                        break
            if not candidates:
                candidates = [payload]

        normalized: list[SearchResultItem] = []
        for index, item in enumerate(candidates[:max_results], start=1):
            title = item.get("title") or item.get("name") or item.get("headline")
            url = item.get("url") or item.get("link")
            snippet = item.get("description") or item.get("snippet") or item.get("summary")

            if not title or not url:
                continue

            normalized.append(
                SearchResultItem(
                    id=str(item.get("id") or f"result_{index}"),
                    title=str(title),
                    url=str(url),
                    source="brightdata",
                    snippet=str(snippet) if snippet else None,
                    rank=int(item.get("rank") or index),
                    domain=self._extract_domain(str(url)),
                    published_at=self._coerce_published_at(item),
                )
            )

        if not normalized:
            raise InvalidResponseError(
                "Bright Data response did not contain parseable search results.",
                details={"candidate_count": len(candidates)},
            )

        return normalized

    @staticmethod
    def _extract_domain(url: str) -> str | None:
        try:
            return urlparse(url).netloc or None
        except ValueError:
            return None

    @staticmethod
    def _coerce_published_at(item: dict[str, Any]) -> str | None:
        for key in ("published_at", "published", "date", "timestamp"):
            value = item.get(key)
            if value:
                return str(value)
        return None
