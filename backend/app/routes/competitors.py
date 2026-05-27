from fastapi import APIRouter

from app.mock_data import COMPETITORS

router = APIRouter(prefix="/api", tags=["competitors"])


@router.get("/competitors")
def get_competitors():
    return COMPETITORS
