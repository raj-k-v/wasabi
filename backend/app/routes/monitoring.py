from fastapi import APIRouter

from app.models import MonitoringTaskRequest, MonitoringTaskResponse
from app.services.monitoring_service import MonitoringService

router = APIRouter(prefix="/api", tags=["monitoring"])
monitoring_service = MonitoringService()


@router.get("/monitoring", response_model=list[MonitoringTaskResponse])
def get_monitoring_tasks() -> list[MonitoringTaskResponse]:
    return monitoring_service.list_tasks()


@router.post("/monitoring", response_model=MonitoringTaskResponse)
def create_monitoring_task(request: MonitoringTaskRequest) -> MonitoringTaskResponse:
    return monitoring_service.create_task(request)
