from app.models import ReportListItem, ReportRequest, ReportResponse, SearchRequest
from app.services.agent_service import IntelligenceAgentService
from app.services.brightdata_service import BrightDataService
from app.services.groq_service import GroqService


class ReportService:
    _reports: list[ReportResponse] | None = None

    def __init__(
        self,
        agent_service: IntelligenceAgentService | None = None,
        brightdata_service: BrightDataService | None = None,
        groq_service: GroqService | None = None,
    ) -> None:
        self.agent_service = agent_service or IntelligenceAgentService()
        self.brightdata_service = brightdata_service or BrightDataService()
        self.groq_service = groq_service or GroqService()
        if self.__class__._reports is None:
            self.__class__._reports = []

    def list_reports(self) -> list[ReportResponse]:
        return list(self.__class__._reports or [])

    def list_report_summaries(self) -> list[ReportListItem]:
        return [
            ReportListItem(
                id=report.id,
                title=report.title,
                summary=report.summary,
                signals_count=len(report.signals),
                created_at=report.created_at,
            )
            for report in self.__class__._reports or []
        ]

    def create_report(self, request: ReportRequest) -> ReportResponse:
        company = request.company
        query = request.search_query or request.company or request.title
        search_response = self.agent_service.run_search(
            request=SearchRequest(
                query=query,
                company=company,
                max_results=request.max_results,
                include_page_content=False,
            )
        )

        report = self.groq_service.generate_report(
            title=request.title,
            company=search_response.company,
            results=search_response.results,
            signals=search_response.signals,
        )
        self.__class__._reports = [report, *(self.__class__._reports or [])]
        return report
