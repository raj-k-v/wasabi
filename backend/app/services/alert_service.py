from datetime import datetime, timezone

from app.exceptions import AppError
from app.models import AlertReadResponse, AlertResponse
from app.services.brightdata_service import BrightDataService
from app.services.groq_service import GroqService
from app.services.monitoring_service import MonitoringService


class AlertService:
    _alerts: list[AlertResponse] | None = None

    def __init__(
        self,
        monitoring_service: MonitoringService | None = None,
        brightdata_service: BrightDataService | None = None,
        groq_service: GroqService | None = None,
    ) -> None:
        self.monitoring_service = monitoring_service or MonitoringService()
        self.brightdata_service = brightdata_service or BrightDataService()
        self.groq_service = groq_service or GroqService()
        if self.__class__._alerts is None:
            self.__class__._alerts = self._build_fallback_alerts()

    def list_alerts(self, *, refresh: bool = True) -> list[AlertResponse]:
        if refresh:
            self.__class__._alerts = self._refresh_alert_cache()
        elif not self.__class__._alerts:
            self.__class__._alerts = self._build_fallback_alerts()
        return list(self.__class__._alerts or [])

    def mark_as_read(self, alert_id: str) -> AlertReadResponse:
        updated = False
        alerts = []
        for alert in self.__class__._alerts or []:
            if alert.id == alert_id:
                alerts.append(alert.copy(update={"read": True}))
                updated = True
            else:
                alerts.append(alert)

        self.__class__._alerts = alerts
        message = "Alert marked as read." if updated else "Alert not found in current cache."
        return AlertReadResponse(id=alert_id, read=updated, message=message)

    def _refresh_alert_cache(self) -> list[AlertResponse]:
        try:
            generated_alerts = self._generate_alerts()
        except AppError:
            return list(self.__class__._alerts or self._build_fallback_alerts())

        if not generated_alerts:
            return list(self.__class__._alerts or self._build_fallback_alerts())

        return generated_alerts

    def _generate_alerts(self) -> list[AlertResponse]:
        companies = self.monitoring_service.active_companies()[:3]
        generated_alerts: list[AlertResponse] = []

        for company_index, company in enumerate(companies, start=1):
            news_results = self.brightdata_service.search_news(company, max_results=4)
            extracted = self.brightdata_service.extract_signals(news_results)
            intelligence = self.groq_service.analyze_signals(company, news_results, extracted)

            for alert_index, alert in enumerate(intelligence.alerts[:2], start=1):
                generated_alerts.append(
                    alert.copy(
                        update={
                            "id": f"{company.lower().replace(' ', '_')}_{company_index}_{alert_index}",
                            "timestamp": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
                        }
                    )
                )

        return generated_alerts

    def _build_fallback_alerts(self) -> list[AlertResponse]:
        fallback_alerts: list[AlertResponse] = []

        for index, task in enumerate(self.monitoring_service.list_tasks(), start=1):
            severity = "high" if "pricing" in task.target.lower() else "medium" if task.status == "active" else "low"
            signal_type = task.target.lower().replace(" ", "_")
            summary = f"{task.target} monitoring for {task.company} is {task.status}."
            fallback_alerts.append(
                AlertResponse(
                    id=f"fallback_alert_{index}",
                    company=task.company,
                    severity=severity,
                    signal_type=signal_type,
                    summary=summary,
                    timestamp=task.last_run_at or datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
                    read=False,
                    source_urls=[task.target_url],
                )
            )

        return fallback_alerts
