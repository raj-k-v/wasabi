from fastapi import APIRouter

from app.mock_data import ALERTS

router = APIRouter(prefix="/api", tags=["alerts"])


@router.get("/alerts")
def get_alerts():
    return ALERTS


@router.patch("/alerts/{alert_id}/read")
def mark_alert_as_read(alert_id: str):
    return {
        "id": alert_id,
        "read": True,
        "message": "Alert marked as read.",
    }
