from rest_framework import generics
from django.db.models.query import QuerySet
from rest_framework.permissions import BasePermission, IsAuthenticatedOrReadOnly
from apps.reservations.models import Game, Reservation
from apps.reservations.serializers import GameSerializer, ReservationSerializer

__all__: list[str] = ["GameListView", "GameDetailView", "ReservationListCreateView"]


class GameListView(generics.ListCreateAPIView):
    queryset: QuerySet[Game] = Game.objects.all()
    serializer_class: type[GameSerializer] = GameSerializer
    permission_classes: list[BasePermission] = [IsAuthenticatedOrReadOnly]


class GameDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset: QuerySet[Game] = Game.objects.all()
    serializer_class: type[GameSerializer] = GameSerializer


class ReservationListCreateView(generics.ListCreateAPIView):
    queryset: QuerySet[Reservation] = Reservation.objects.all()
    serializer_class: type[ReservationSerializer] = ReservationSerializer

    def get_object(self) -> Game:
        return Game.objects.get(pk=self.kwargs["pk"])

    def perform_create(self, serializer: ReservationSerializer) -> None:
        return serializer.save(game=self.get_object())
