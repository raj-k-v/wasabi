from fastapi import APIRouter

from app.mock_data import REPORTS
from app.models import ReportRequest
from app.services.report_service import ReportService

router = APIRouter(prefix="/api", tags=["reports"])
report_service = ReportService()


@router.get("/reports")
def get_reports():
    return REPORTS


@router.post("/reports")
def create_report(request: ReportRequest):
    return report_service.create_report(request)
