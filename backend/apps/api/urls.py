from django.urls import path, include, URLResolver

__all__: list[str] = ["urlpatterns"]

urlpatterns: list[URLResolver] = [
    path("", include("apps.core.urls")),
    path("", include("apps.reservations.urls")),
]
