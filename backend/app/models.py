from pydantic import BaseModel, Field


class SearchRequest(BaseModel):
    query: str
    company: str | None = None


class ReportRequest(BaseModel):
    title: str
    company: str | None = None
    signal_types: list[str] = Field(default_factory=list)


class MonitoringTaskRequest(BaseModel):
    company: str
    target: str
    target_url: str
    frequency: str = "daily"
