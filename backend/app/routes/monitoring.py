from fastapi import APIRouter

from app.mock_data import MONITORING_TASKS
from app.models import MonitoringTaskRequest

router = APIRouter(prefix="/api", tags=["monitoring"])


@router.get("/monitoring")
def get_monitoring_tasks():
    return MONITORING_TASKS


@router.post("/monitoring")
def create_monitoring_task(request: MonitoringTaskRequest):
    return {
        "id": "monitor_new",
        "company": request.company,
        "target": request.target,
        "target_url": request.target_url,
        "frequency": request.frequency,
        "status": "active",
        "last_run_at": None,
        "message": "Monitoring task created.",
    }
