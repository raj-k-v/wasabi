from fastapi import APIRouter

from app.models import SearchRequest, SearchResponse
from app.services.agent_service import IntelligenceAgentService

router = APIRouter(prefix="/api", tags=["search"])
agent_service = IntelligenceAgentService()


@router.post("/search", response_model=SearchResponse)
def search_intelligence(request: SearchRequest) -> SearchResponse:
    return agent_service.run_search(request=request)
