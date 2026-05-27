from fastapi import APIRouter

from app.models import SearchRequest
from app.services.agent_service import IntelligenceAgentService

router = APIRouter(prefix="/api", tags=["search"])
agent_service = IntelligenceAgentService()


@router.post("/search")
def search_intelligence(request: SearchRequest):
    return agent_service.run_search(query=request.query, company=request.company)
