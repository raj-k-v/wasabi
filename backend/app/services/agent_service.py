from app.services.bright_data_service import BrightDataService
from app.services.openai_service import OpenAIAnalysisService


class IntelligenceAgentService:
    def __init__(
        self,
        bright_data_service: BrightDataService | None = None,
        openai_service: OpenAIAnalysisService | None = None,
    ) -> None:
        self.bright_data_service = bright_data_service or BrightDataService()
        self.openai_service = openai_service or OpenAIAnalysisService()

    def run_search(self, query: str, company: str | None = None) -> dict:
        results = self.bright_data_service.search_web(query=query, company=company)
        structured_signal = self.openai_service.analyze_search_results(
            query=query,
            company=company,
            results=results,
        )

        return {
            "query": query,
            "company": company,
            "results": results,
            "structured_signal": structured_signal,
        }
