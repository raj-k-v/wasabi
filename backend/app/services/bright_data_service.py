class BrightDataService:
    def search_web(self, query: str, company: str | None = None) -> list[dict]:
        search_context = f"{company} {query}" if company else query

        return [
            {
                "id": "result_1",
                "title": "Pricing update detected",
                "url": "https://example.com/pricing",
                "source": "mock_bright_data",
                "summary": f"A pricing page matching '{search_context}' was found.",
            },
            {
                "id": "result_2",
                "title": "New competitor signal",
                "url": "https://example.org/news",
                "source": "mock_bright_data",
                "summary": "A recent page mentions activity related to the query.",
            },
        ]
