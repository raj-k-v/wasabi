import json
import re
from datetime import datetime, timezone
from typing import Any

from groq import APIConnectionError, APIStatusError, Groq, RateLimitError

from app.config import get_settings
from app.exceptions import (
    ConfigurationError,
    ExternalAPIError,
    InvalidResponseError,
    RateLimitAppError,
    UpstreamTimeoutError,
)
from app.models import AlertResponse, IntelligencePayload, ReportResponse, SearchResultItem, SignalItem


class GroqService:
    def __init__(self) -> None:
        self.settings = get_settings()
        if not self.settings.groq_api_key:
            self.client = None
        else:
            self.client = Groq(
                api_key=self.settings.groq_api_key,
                timeout=self.settings.request_timeout_seconds,
            )

    def generate_summary(self, company: str, results: list[SearchResultItem]) -> str:
        prompt = {
            "company": company,
            "results": [result.dict() for result in results],
            "task": "Create a concise competitive intelligence summary in one or two sentences.",
        }
        content = self._chat(prompt=prompt)
        return content.strip()

    def analyze_signals(
        self,
        company: str,
        results: list[SearchResultItem],
        extracted_signals: list[SignalItem] | None = None,
    ) -> IntelligencePayload:
        prompt = {
            "company": company,
            "results": [result.dict() for result in results],
            "extracted_signals": [signal.dict() for signal in (extracted_signals or [])],
            "task": (
                "Return JSON with keys summary, signals, alerts. "
                "Each signal must include type, severity, message, confidence, evidence. "
                "Each alert must include company, severity, signal_type, summary."
            ),
        }
        parsed = self._chat_json(prompt=prompt)
        generated_at = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")

        signals = [
            SignalItem(
                type=self._normalize_signal_type(item.get("type")),
                severity=self._normalize_severity(item.get("severity")),
                message=str(item.get("message") or item.get("summary") or "Signal detected"),
                confidence=self._normalize_confidence(item.get("confidence")),
                evidence=self._normalize_evidence(item.get("evidence")),
            )
            for item in parsed.get("signals", [])
            if isinstance(item, dict)
        ]

        alerts = [
            AlertResponse(
                id=f"alert_{index}",
                company=str(item.get("company") or company),
                severity=self._normalize_severity(item.get("severity")),
                signal_type=self._normalize_signal_type(item.get("signal_type") or item.get("type")),
                summary=str(item.get("summary") or item.get("message") or "Alert generated"),
                timestamp=str(item.get("timestamp") or generated_at),
                source_urls=self._normalize_evidence(item.get("source_urls") or item.get("evidence")),
            )
            for index, item in enumerate(parsed.get("alerts", []), start=1)
            if isinstance(item, dict)
        ]

        if not signals:
            signals = extracted_signals or []

        if not alerts and signals:
            alerts = [
                AlertResponse(
                    id=f"alert_{index}",
                    company=company,
                    severity=signal.severity,
                    signal_type=signal.type,
                    summary=signal.message,
                    timestamp=generated_at,
                    source_urls=signal.evidence,
                )
                for index, signal in enumerate(signals[:3], start=1)
            ]

        return IntelligencePayload(
            company=company,
            summary=str(parsed.get("summary") or "No meaningful intelligence summary was generated.").strip(),
            signals=signals,
            alerts=alerts,
        )

    def generate_report(
        self,
        *,
        title: str,
        company: str | None,
        results: list[SearchResultItem],
        signals: list[SignalItem],
    ) -> ReportResponse:
        prompt = {
            "title": title,
            "company": company,
            "results": [result.dict() for result in results],
            "signals": [signal.dict() for signal in signals],
            "task": (
                "Return JSON with keys summary and recommendations. "
                "Recommendations must be a short list of actionable items."
            ),
        }
        parsed = self._chat_json(prompt=prompt)
        created_at = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")

        return ReportResponse(
            id=f"report_{int(datetime.now(timezone.utc).timestamp())}",
            title=title,
            company=company,
            summary=str(parsed.get("summary") or "No report summary generated.").strip(),
            signals=signals,
            recommendations=[
                str(item).strip()
                for item in parsed.get("recommendations", [])
                if isinstance(item, str) and item.strip()
            ][:5],
            created_at=created_at,
        )

    def _chat(self, *, prompt: dict[str, Any]) -> str:
        if not self.client:
            raise ConfigurationError("GROQ_API_KEY is not configured.")

        try:
            completion = self.client.chat.completions.create(
                model=self.settings.groq_model,
                temperature=0.2,
                max_tokens=800,
                messages=[
                    {
                        "role": "system",
                        "content": (
                            "You are an AI analyst for a web intelligence platform. "
                            "Be factual, concise, and base your reasoning on the provided evidence."
                        ),
                    },
                    {
                        "role": "user",
                        "content": json.dumps(prompt),
                    },
                ],
            )
        except RateLimitError as exc:
            raise RateLimitAppError("Groq rate limit reached.", details={"provider": "groq"}) from exc
        except APIConnectionError as exc:
            raise UpstreamTimeoutError("Could not reach Groq.", details={"provider": "groq"}) from exc
        except APIStatusError as exc:
            status_code = getattr(exc, "status_code", None)
            if status_code == 429:
                raise RateLimitAppError("Groq rate limit reached.", details={"provider": "groq"}) from exc
            raise ExternalAPIError(
                "Groq returned an error response.",
                details={"provider": "groq", "status_code": status_code},
            ) from exc
        except Exception as exc:
            raise ExternalAPIError(
                "Unexpected Groq error.",
                details={"provider": "groq", "reason": str(exc)},
            ) from exc

        content = completion.choices[0].message.content if completion.choices else None
        if not content:
            raise InvalidResponseError("Groq returned an empty response.", details={"provider": "groq"})

        return content

    def _chat_json(self, *, prompt: dict[str, Any]) -> dict[str, Any]:
        content = self._chat(prompt=prompt)
        json_match = re.search(r"\{.*\}", content, re.DOTALL)
        candidate = json_match.group(0) if json_match else content

        try:
            parsed = json.loads(candidate)
        except json.JSONDecodeError as exc:
            raise InvalidResponseError(
                "Groq returned invalid JSON.",
                details={"provider": "groq", "content_preview": content[:500]},
            ) from exc

        if not isinstance(parsed, dict):
            raise InvalidResponseError(
                "Groq JSON payload is not an object.",
                details={"provider": "groq", "payload_type": type(parsed).__name__},
            )

        return parsed

    @staticmethod
    def _normalize_severity(value: Any) -> str:
        severity = str(value or "medium").strip().lower()
        if severity not in {"low", "medium", "high", "critical"}:
            return "medium"
        return severity

    @staticmethod
    def _normalize_signal_type(value: Any) -> str:
        signal_type = str(value or "market_activity").strip().lower().replace(" ", "_")
        return signal_type or "market_activity"

    @staticmethod
    def _normalize_confidence(value: Any) -> float | None:
        if value is None:
            return None
        try:
            confidence = float(value)
        except (TypeError, ValueError):
            return None
        return min(max(confidence, 0.0), 1.0)

    @staticmethod
    def _normalize_evidence(value: Any) -> list[str]:
        if isinstance(value, list):
            return [str(item) for item in value if item]
        if isinstance(value, str) and value.strip():
            return [value.strip()]
        return []
