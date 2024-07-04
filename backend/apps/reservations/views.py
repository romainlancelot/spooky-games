from django.db.models.query import QuerySet
from rest_framework import generics, filters
from rest_framework.permissions import (
    BasePermission,
    IsAuthenticatedOrReadOnly,
    IsAuthenticated,
)
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from apps.reservations.models import RESERVATION_TIME_CHOICES, Game, Reservation
from apps.reservations.serializers import GameSerializer, ReservationSerializer
from apps.core.permissions import IsAdminOrSuperUser

__all__: list[str] = [
    "GameListView",
    "GameDetailView",
    "ReservationListCreateView",
    "ReservationAdminView",
    "ReservationAdminDetailView",
    "OpeningHoursView",
]


class GameListView(generics.ListCreateAPIView):
    queryset: QuerySet[Game] = Game.objects.all()
    serializer_class: type[GameSerializer] = GameSerializer
    permission_classes: list[BasePermission] = [IsAuthenticatedOrReadOnly]
    filter_backends: list[filters.BaseFilterBackend] = [filters.SearchFilter]
    search_fields: list[str] = ["name", "description"]


class GameDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset: QuerySet[Game] = Game.objects.all()
    serializer_class: type[GameSerializer] = GameSerializer


class ReservationListCreateView(generics.ListCreateAPIView):
    queryset: QuerySet[Reservation] = Reservation.objects.all()
    serializer_class: type[ReservationSerializer] = ReservationSerializer
    permission_classes: list[BasePermission] = [IsAuthenticatedOrReadOnly]
    filter_backends: list[filters.BaseFilterBackend] = [filters.SearchFilter]
    search_fields: list[str] = ["date", "owner__username"]

    def get_object(self) -> Game:
        return Game.objects.get(pk=self.kwargs["pk"])

    def perform_create(self, serializer: ReservationSerializer) -> None:
        return serializer.save(game=self.get_object(), owner=self.request.user)


class ReservationAdminView(generics.ListAPIView):
    queryset: QuerySet[Reservation] = Reservation.objects.all()
    serializer_class: type[ReservationSerializer] = ReservationSerializer
    permission_classes: list[BasePermission] = [IsAuthenticated, IsAdminOrSuperUser]
    filter_backends: list[filters.BaseFilterBackend] = [filters.SearchFilter]
    search_fields: list[str] = ["date", "owner__username"]


class ReservationAdminDetailView(generics.DestroyAPIView):
    queryset: QuerySet[Reservation] = Reservation.objects.all()
    serializer_class: type[ReservationSerializer] = ReservationSerializer
    permission_classes: list[BasePermission] = [IsAuthenticated, IsAdminOrSuperUser]


class OpeningHoursView(APIView):
    def get(self, request: Request) -> Response:
        return Response(
            {"opening_hours": [key for key, value in RESERVATION_TIME_CHOICES]}
        )
