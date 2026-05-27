class OpenAIAnalysisService:
    def analyze_search_results(
        self,
        query: str,
        company: str | None,
        results: list[dict],
    ) -> dict:
        return {
            "company": company or "Unknown company",
            "signal_type": "market_activity",
            "severity": "medium",
            "change_detected": bool(results),
            "confidence": 0.82,
            "summary": "Mock intelligence signal generated from search results.",
            "recommended_action": "Review the source pages and monitor for follow-up changes.",
            "evidence_count": len(results),
            "query": query,
        }
