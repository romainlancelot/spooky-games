from django.apps import AppConfig

__all__: list[str] = ["ReservationsConfig"]


class ReservationsConfig(AppConfig):
    default_auto_field: str = "django.db.models.BigAutoField"
    name: str = "apps.reservations"
