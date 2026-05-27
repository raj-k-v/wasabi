from datetime import datetime, timezone


class AppError(Exception):
    def __init__(
        self,
        message: str,
        *,
        status_code: int = 500,
        code: str = "internal_error",
        details: dict | None = None,
    ) -> None:
        super().__init__(message)
        self.message = message
        self.status_code = status_code
        self.code = code
        self.details = details or {}

    def to_response(self) -> dict:
        return {
            "error": {
                "code": self.code,
                "message": self.message,
                "details": self.details,
                "timestamp": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
            }
        }


class ConfigurationError(AppError):
    def __init__(self, message: str, *, details: dict | None = None) -> None:
        super().__init__(
            message,
            status_code=500,
            code="configuration_error",
            details=details,
        )


class ExternalAPIError(AppError):
    def __init__(self, message: str, *, details: dict | None = None) -> None:
        super().__init__(
            message,
            status_code=502,
            code="external_api_error",
            details=details,
        )


class InvalidResponseError(AppError):
    def __init__(self, message: str, *, details: dict | None = None) -> None:
        super().__init__(
            message,
            status_code=502,
            code="invalid_response",
            details=details,
        )


class RateLimitAppError(AppError):
    def __init__(self, message: str, *, details: dict | None = None) -> None:
        super().__init__(
            message,
            status_code=429,
            code="rate_limited",
            details=details,
        )


class UpstreamTimeoutError(AppError):
    def __init__(self, message: str, *, details: dict | None = None) -> None:
        super().__init__(
            message,
            status_code=504,
            code="upstream_timeout",
            details=details,
        )
