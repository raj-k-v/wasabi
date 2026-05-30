from app.models import AlertResponse, DashboardActivity, DashboardResponse, DashboardStat
from app.services.alert_service import AlertService
from app.services.competitor_service import CompetitorService
from app.services.monitoring_service import MonitoringService
from app.services.report_service import ReportService
from app.services.store_service import store


class DashboardService:
    def __init__(
        self,
        monitoring_service: MonitoringService | None = None,
        competitor_service: CompetitorService | None = None,
        alert_service: AlertService | None = None,
        report_service: ReportService | None = None,
    ) -> None:
        self.monitoring_service = monitoring_service or MonitoringService()
        self.competitor_service = competitor_service or CompetitorService()
        self.alert_service = alert_service or AlertService()
        self.report_service = report_service or ReportService()

    def get_dashboard(self) -> DashboardResponse:
        monitoring_tasks = self.monitoring_service.list_tasks()
        competitors = list(store.competitors.values()) or self.competitor_service.list_competitors()
        alerts = store.alerts or self.alert_service.list_alerts(refresh=False)
        reports = self.report_service.list_reports()

        recent_activity = store.activities or [
            DashboardActivity(
                id=task.id,
                message=f"{task.target} monitoring is {task.status} for {task.company}.",
                created_at=task.last_run_at or "pending",
            )
            for task in monitoring_tasks[:5]
        ]

        stats = store.get_stats() if store.competitors else DashboardStat(
            monitored_companies=len({task.company for task in monitoring_tasks}),
            active_alerts=len([alert for alert in alerts if not alert.read]),
            signals_detected=sum(len(report.signals) for report in reports) or len(alerts),
            reports_generated=len(reports),
        )

        return DashboardResponse(
            stats=stats,
            recent_signals=self._recent_signals(alerts, competitors),
            recent_activity=recent_activity,
        )

    @staticmethod
    def _recent_signals(alerts: list[AlertResponse], competitors: list) -> list[AlertResponse]:
        if alerts:
            return alerts[:5]

        return [
            AlertResponse(
                id=competitor.id,
                company=competitor.name,
                severity=competitor.risk_level,
                signal_type="monitoring_status",
                summary=f"{competitor.name} is being tracked for emerging web signals.",
                timestamp=competitor.last_checked_at or "pending",
                read=False,
                source_urls=[competitor.website],
            )
            for competitor in competitors[:3]
        ]
