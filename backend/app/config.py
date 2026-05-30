import os
from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parents[1]
load_dotenv(BASE_DIR / ".env")
load_dotenv(BASE_DIR / ".env.local", override=True)


@dataclass(frozen=True)
class Settings:
    app_name: str
    app_env: str
    frontend_origin: str
    groq_api_key: str | None
    brightdata_api_key: str | None
    brightdata_serp_url: str | None
    brightdata_serp_zone: str | None
    brightdata_scraper_url: str | None
    brightdata_scraper_zone: str | None
    request_timeout_seconds: float = 12.0
    max_retries: int = 1
    groq_model: str = "llama3-70b-8192"

    @property
    def is_production(self) -> bool:
        return self.app_env.lower() == "production"


@lru_cache
def get_settings() -> Settings:
    return Settings(
        app_name=os.getenv("APP_NAME", "Wasabi Backend"),
        app_env=os.getenv("APP_ENV", "development"),
        frontend_origin=os.getenv("FRONTEND_ORIGIN", "http://localhost:3000"),
        groq_api_key=os.getenv("GROQ_API_KEY"),
        brightdata_api_key=os.getenv("BRIGHTDATA_API_KEY"),
        brightdata_serp_url=os.getenv("BRIGHTDATA_SERP_URL"),
        brightdata_serp_zone=os.getenv("BRIGHTDATA_SERP_ZONE"),
        brightdata_scraper_url=os.getenv("BRIGHTDATA_SCRAPER_URL"),
        brightdata_scraper_zone=os.getenv("BRIGHTDATA_SCRAPER_ZONE"),
        request_timeout_seconds=float(os.getenv("REQUEST_TIMEOUT_SECONDS", "12")),
        max_retries=int(os.getenv("MAX_RETRIES", "1")),
        groq_model=os.getenv("GROQ_MODEL", "llama3-70b-8192"),
    )
