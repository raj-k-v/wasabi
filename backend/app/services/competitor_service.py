from app.services.store_service import store
from app.models import CompetitorResponse


class CompetitorService:
    def list_competitors(self) -> list[CompetitorResponse]:
        return list(store.competitors.values())
