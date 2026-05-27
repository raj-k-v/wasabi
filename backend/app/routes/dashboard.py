from fastapi import APIRouter

from app.models import DashboardResponse
from app.services.dashboard_service import DashboardService

router = APIRouter(prefix="/api", tags=["dashboard"])
dashboard_service = DashboardService()


@router.get("/dashboard", response_model=DashboardResponse)
def get_dashboard() -> DashboardResponse:
    return dashboard_service.get_dashboard()
