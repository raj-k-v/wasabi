from fastapi import APIRouter, Query

from app.models import AlertReadResponse, AlertResponse
from app.services.alert_service import AlertService

router = APIRouter(prefix="/api", tags=["alerts"])
alert_service = AlertService()


@router.get("/alerts", response_model=list[AlertResponse])
def get_alerts(refresh: bool = Query(default=False)) -> list[AlertResponse]:
    return alert_service.list_alerts(refresh=refresh)


@router.patch("/alerts/{alert_id}/read", response_model=AlertReadResponse)
def mark_alert_as_read(alert_id: str) -> AlertReadResponse:
    return alert_service.mark_as_read(alert_id)
