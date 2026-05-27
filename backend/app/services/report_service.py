from datetime import datetime, timezone

from app.models import ReportRequest


class ReportService:
    def create_report(self, request: ReportRequest) -> dict:
        created_at = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")

        return {
            "id": "report_new",
            "title": request.title,
            "company": request.company,
            "signal_types": request.signal_types,
            "summary": "Mock report generated from selected intelligence signals.",
            "recommendations": [
                "Validate the highest-confidence signals.",
                "Compare pricing and hiring changes against your current strategy.",
                "Schedule continued monitoring for important competitors.",
            ],
            "created_at": created_at,
        }
