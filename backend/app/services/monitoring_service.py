from app.mock_data import MONITORING_TASKS
from app.models import MonitoringTaskRequest, MonitoringTaskResponse


class MonitoringService:
    _tasks: list[MonitoringTaskResponse] | None = None

    def __init__(self) -> None:
        if self.__class__._tasks is None:
            self.__class__._tasks = [MonitoringTaskResponse(**task) for task in MONITORING_TASKS]

    def list_tasks(self) -> list[MonitoringTaskResponse]:
        return list(self.__class__._tasks or [])

    def create_task(self, request: MonitoringTaskRequest) -> MonitoringTaskResponse:
        task = MonitoringTaskResponse(
            id=f"monitor_{len(self.__class__._tasks or []) + 1}",
            company=request.company,
            target=request.target,
            target_url=request.target_url,
            frequency=request.frequency,
            status="active",
            last_run_at=None,
        )
        self.__class__._tasks = [*(self.__class__._tasks or []), task]
        return task

    def active_companies(self) -> list[str]:
        companies: list[str] = []
        for task in self.__class__._tasks or []:
            if task.status == "active" and task.company not in companies:
                companies.append(task.company)
        return companies
