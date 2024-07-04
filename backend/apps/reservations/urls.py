from django.urls import path, URLPattern
from apps.reservations.views import (
    GameDetailView,
    GameListView,
    ReservationListCreateView,
    OpeningHoursView,
    ReservationAdminView,
    ReservationAdminDetailView,
)

__all__: list[str] = ["urlpatterns"]

urlpatterns: list[URLPattern] = [
    path("games/", GameListView.as_view(), name="game-list"),
    path("games/<int:pk>/", GameDetailView.as_view(), name="game-detail"),
    path(
        "games/<int:pk>/reservations/",
        ReservationListCreateView.as_view(),
        name="game-reservation-list",
    ),
    path(
        "admin/reservations/", ReservationAdminView.as_view(), name="reservation-list"
    ),
    path(
        "admin/reservations/<int:pk>/",
        ReservationAdminDetailView.as_view(),
        name="reservation-detail",
    ),
    path("games/opening-hours", OpeningHoursView.as_view(), name="opening-hours"),
]
