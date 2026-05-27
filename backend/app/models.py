from pydantic import BaseModel, Field


class SearchRequest(BaseModel):
    query: str = Field(..., min_length=2, max_length=200)
    company: str | None = Field(default=None, min_length=1, max_length=200)
    max_results: int = Field(default=5, ge=1, le=10)
    include_page_content: bool = False


class SearchResultItem(BaseModel):
    id: str
    title: str
    url: str
    source: str = "brightdata"
    snippet: str | None = None
    rank: int | None = None
    domain: str | None = None
    published_at: str | None = None


class SignalItem(BaseModel):
    type: str
    severity: str
    message: str
    confidence: float | None = Field(default=None, ge=0, le=1)
    evidence: list[str] = Field(default_factory=list)


class AlertResponse(BaseModel):
    id: str
    company: str
    severity: str
    signal_type: str
    summary: str
    timestamp: str
    read: bool = False
    source_urls: list[str] = Field(default_factory=list)


class AlertReadResponse(BaseModel):
    id: str
    read: bool
    message: str


class SearchResponse(BaseModel):
    company: str
    query: str
    summary: str
    signals: list[SignalItem] = Field(default_factory=list)
    alerts: list[AlertResponse] = Field(default_factory=list)
    results: list[SearchResultItem] = Field(default_factory=list)
    generated_at: str


class MonitoringTaskRequest(BaseModel):
    company: str = Field(..., min_length=2, max_length=200)
    target: str = Field(..., min_length=2, max_length=200)
    target_url: str = Field(..., min_length=5, max_length=500)
    frequency: str = Field(default="daily", min_length=2, max_length=50)


class MonitoringTaskResponse(BaseModel):
    id: str
    company: str
    target: str
    target_url: str
    frequency: str
    status: str
    last_run_at: str | None = None


class CompetitorResponse(BaseModel):
    id: str
    name: str
    industry: str
    website: str
    risk_level: str
    signals_count: int = 0
    last_checked_at: str | None = None


class DashboardStat(BaseModel):
    monitored_companies: int
    active_alerts: int
    signals_detected: int
    reports_generated: int


class DashboardActivity(BaseModel):
    id: str
    message: str
    created_at: str


class DashboardResponse(BaseModel):
    stats: DashboardStat
    recent_signals: list[AlertResponse] = Field(default_factory=list)
    recent_activity: list[DashboardActivity] = Field(default_factory=list)


class ReportRequest(BaseModel):
    title: str = Field(..., min_length=3, max_length=200)
    company: str | None = Field(default=None, min_length=1, max_length=200)
    search_query: str | None = Field(default=None, min_length=2, max_length=200)
    signal_types: list[str] = Field(default_factory=list)
    max_results: int = Field(default=5, ge=1, le=10)


class ReportResponse(BaseModel):
    id: str
    title: str
    company: str | None = None
    summary: str
    signals: list[SignalItem] = Field(default_factory=list)
    recommendations: list[str] = Field(default_factory=list)
    created_at: str


class ReportListItem(BaseModel):
    id: str
    title: str
    summary: str
    signals_count: int
    created_at: str


class ScrapedPage(BaseModel):
    url: str
    title: str | None = None
    content: str | None = None
    metadata: dict = Field(default_factory=dict)


class IntelligencePayload(BaseModel):
    company: str
    summary: str
    signals: list[SignalItem] = Field(default_factory=list)
    alerts: list[AlertResponse] = Field(default_factory=list)


class ErrorResponse(BaseModel):
    error: dict
