import os
from dataclasses import dataclass

from dotenv import load_dotenv

load_dotenv()


@dataclass(frozen=True)
class Settings:
    app_name: str = "Wasabi Backend"
    frontend_origin: str = "http://localhost:3000"
    bright_data_api_key: str | None = None
    openai_api_key: str | None = None


def get_settings() -> Settings:
    return Settings(
        app_name=os.getenv("APP_NAME", "Wasabi Backend"),
        frontend_origin=os.getenv("FRONTEND_ORIGIN", "http://localhost:3000"),
        bright_data_api_key=os.getenv("BRIGHT_DATA_API_KEY"),
        openai_api_key=os.getenv("OPENAI_API_KEY"),
    )
