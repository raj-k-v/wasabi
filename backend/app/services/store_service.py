from app.models import AlertResponse, CompetitorResponse, DashboardActivity, DashboardStat


class MemoryStore:
    def __init__(self) -> None:
        self.competitors: dict[str, CompetitorResponse] = {}
        self.alerts: list[AlertResponse] = []
        self.activities: list[DashboardActivity] = []
        self.signals_detected = 0
        self.reports_generated = 0

    def add_search_result(self, company: str, alerts: list[AlertResponse], signals_count: int) -> None:
        # Add or update competitor
        if company not in self.competitors:
            comp_id = f"comp_{len(self.competitors) + 1}"
            self.competitors[company] = CompetitorResponse(
                id=comp_id,
                name=company,
                industry="Analyzed via Search",
                website=f"https://www.{company.lower().replace(' ', '')}.com",
                risk_level="medium",
                signals_count=signals_count,
                last_checked_at="Just now"
            )
        else:
            self.competitors[company].signals_count += signals_count
            self.competitors[company].last_checked_at = "Updated now"

        # Add alerts
        self.alerts = alerts + self.alerts  # Newest first
        self.signals_detected += signals_count
        
        # Add activity
        activity_id = f"act_{len(self.activities) + 1}"
        self.activities.insert(0, DashboardActivity(
            id=activity_id,
            message=f"Deep intelligence scan completed for {company}. {len(alerts)} alerts generated.",
            created_at="Just now"
        ))

    def get_stats(self) -> DashboardStat:
        return DashboardStat(
            monitored_companies=len(self.competitors),
            active_alerts=len(self.alerts),
            signals_detected=self.signals_detected,
            reports_generated=self.reports_generated
        )


# Global instance for the life of the server
store = MemoryStore()
