from datetime import datetime, timezone
from app.models import AlertResponse, CompetitorResponse, DashboardActivity, DashboardStat, MonitoringTaskResponse


class MemoryStore:
    def __init__(self) -> None:
        self.competitors: dict[str, CompetitorResponse] = {}
        self.alerts: list[AlertResponse] = []
        self.activities: list[DashboardActivity] = []
        self.monitoring_tasks: list[MonitoringTaskResponse] = []
        self.signals_detected = 0
        self.reports_generated = 0

    def add_search_result(self, company: str, alerts: list[AlertResponse], signals_count: int) -> None:
        now = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
        
        # Add or update competitor
        if company not in self.competitors:
            comp_id = f"comp_{len(self.competitors) + 1}"
            self.competitors[company] = CompetitorResponse(
                id=comp_id,
                name=company,
                industry="Market Intelligence",
                website=f"https://www.{company.lower().replace(' ', '')}.com",
                risk_level="medium",
                signals_count=signals_count,
                last_checked_at=now
            )
        else:
            self.competitors[company].signals_count += signals_count
            self.competitors[company].last_checked_at = now

        # Add alerts with unique IDs and source URLs if missing
        for i, alert in enumerate(alerts):
            if not alert.id or alert.id.startswith("alert_"):
                 alert.id = f"alert_{company.lower().replace(' ', '_')}_{int(datetime.now().timestamp())}_{i}"
            if not alert.timestamp:
                 alert.timestamp = now
            self.alerts.insert(0, alert)

        self.signals_detected += signals_count
        
        # Add activity
        activity_id = f"act_{len(self.activities) + 1}"
        self.activities.insert(0, DashboardActivity(
            id=activity_id,
            message=f"Deep intelligence scan completed for {company}. Found {len(alerts)} signals.",
            created_at=now
        ))

    def get_stats(self) -> DashboardStat:
        return DashboardStat(
            monitored_companies=len(self.competitors),
            active_alerts=len([a for a in self.alerts if not a.read]),
            signals_detected=self.signals_detected,
            reports_generated=self.reports_generated
        )


# Global instance
store = MemoryStore()
