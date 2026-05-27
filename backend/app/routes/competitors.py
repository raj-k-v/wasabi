from fastapi import APIRouter

from app.models import CompetitorResponse
from app.services.competitor_service import CompetitorService

router = APIRouter(prefix="/api", tags=["competitors"])
competitor_service = CompetitorService()


@router.get("/competitors", response_model=list[CompetitorResponse])
def get_competitors() -> list[CompetitorResponse]:
    return competitor_service.list_competitors()
