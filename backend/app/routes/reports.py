from fastapi import APIRouter

from app.models import ReportListItem, ReportRequest, ReportResponse
from app.services.report_service import ReportService

router = APIRouter(prefix="/api", tags=["reports"])
report_service = ReportService()


@router.get("/reports", response_model=list[ReportListItem])
def get_reports() -> list[ReportListItem]:
    return report_service.list_report_summaries()


@router.post("/reports", response_model=ReportResponse)
def create_report(request: ReportRequest) -> ReportResponse:
    return report_service.create_report(request)
