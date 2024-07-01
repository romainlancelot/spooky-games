from django.apps import AppConfig

__all__: list[str] = ["ApiConfig"]


class ApiConfig(AppConfig):
    default_auto_field: str = "django.db.models.BigAutoField"
    name: str = "apps.api"
