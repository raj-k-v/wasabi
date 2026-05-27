from app.mock_data import COMPETITORS
from app.models import CompetitorResponse


class CompetitorService:
    def list_competitors(self) -> list[CompetitorResponse]:
        return [CompetitorResponse(**competitor) for competitor in COMPETITORS]
