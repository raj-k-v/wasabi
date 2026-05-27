from fastapi import APIRouter

from app.mock_data import DASHBOARD

router = APIRouter(prefix="/api", tags=["dashboard"])


@router.get("/dashboard")
def get_dashboard():
    return DASHBOARD
