from datetime import datetime, timezone

from app.models import SearchRequest, SearchResponse
from app.services.brightdata_service import BrightDataService
from app.services.groq_service import GroqService
from app.services.store_service import store


class IntelligenceAgentService:
    def __init__(
        self,
        brightdata_service: BrightDataService | None = None,
        groq_service: GroqService | None = None,
    ) -> None:
        self.brightdata_service = brightdata_service or BrightDataService()
        self.groq_service = groq_service or GroqService()

    def run_search(self, request: SearchRequest) -> SearchResponse:
        company = request.company or request.query
        results = self.brightdata_service.search_company(
            company=company,
            query=request.query,
            max_results=request.max_results,
        )

        if request.include_page_content:
            for result in results[:2]:
                try:
                    scraped = self.brightdata_service.scrape_page(result.url)
                    result.snippet = (result.snippet or "") + "\n\nFull Content: " + (scraped.content or "")[:2000]
                except Exception:
                    continue

        extracted_signals = self.brightdata_service.extract_signals(results)
        intelligence = self.groq_service.analyze_signals(company, results, extracted_signals)

        # Persistence: Save to store so dashboard reflects the search
        store.add_search_result(company, intelligence.alerts, len(intelligence.signals))

        return SearchResponse(
            company=company,
            query=request.query,
            summary=intelligence.summary,
            signals=intelligence.signals,
            alerts=intelligence.alerts,
            results=results,
            generated_at=datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        )
