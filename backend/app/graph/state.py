from pydantic import BaseModel, Field

from app.models import AlertResponse, SearchResultItem, SignalItem


class IntelligenceGraphState(BaseModel):
    company: str
    query: str
    search_results: list[SearchResultItem] = Field(default_factory=list)
    signals: list[SignalItem] = Field(default_factory=list)
    alerts: list[AlertResponse] = Field(default_factory=list)
    summary: str | None = None

    # TODO: Move shared orchestration state here when LangGraph is introduced.
