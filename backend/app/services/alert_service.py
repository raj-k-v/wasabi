from app.models import AlertReadResponse, AlertResponse
from app.services.store_service import store


class AlertService:
    def list_alerts(self, *, refresh: bool = False) -> list[AlertResponse]:
        # Ignore refresh for hackathon demo to keep memory state stable
        return list(store.alerts)

    def mark_as_read(self, alert_id: str) -> AlertReadResponse:
        updated = False
        for alert in store.alerts:
            if alert.id == alert_id:
                alert.read = True
                updated = True
                break

        message = "Alert marked as read." if updated else "Alert not found."
        return AlertReadResponse(id=alert_id, read=updated, message=message)
