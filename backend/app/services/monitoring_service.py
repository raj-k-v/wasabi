from app.services.store_service import store
from app.models import MonitoringTaskRequest, MonitoringTaskResponse


class MonitoringService:
    def list_tasks(self) -> list[MonitoringTaskResponse]:
        return list(store.monitoring_tasks)

    def create_task(self, request: MonitoringTaskRequest) -> MonitoringTaskResponse:
        task = MonitoringTaskResponse(
            id=f"monitor_{len(store.monitoring_tasks) + 1}",
            company=request.company,
            target=request.target,
            target_url=request.target_url,
            frequency=request.frequency,
            status="active",
            last_run_at=None,
        )
        store.monitoring_tasks.append(task)
        return task

    def active_companies(self) -> list[str]:
        companies: list[str] = []
        for task in store.monitoring_tasks:
            if task.status == "active" and task.company not in companies:
                companies.append(task.company)
        return companies
