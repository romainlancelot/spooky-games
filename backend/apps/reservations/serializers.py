from typing import Any
from rest_framework import serializers
from apps.reservations.models import Game, Reservation

__all__: list[str] = ["GameSerializer", "ReservationSerializer"]


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model: type[Game] = Game
        fields: list[str] = [
            "id",
            "name",
            "image",
            "description",
            "max_players",
            "created_at",
            "updated_at",
        ]
        read_only_fields: list[str] = ["created_at", "updated_at"]


class ReservationSerializer(serializers.ModelSerializer):
    game: GameSerializer = GameSerializer(read_only=True)

    class Meta:
        model: type[Reservation] = Reservation
        fields: list[str] = [
            "id",
            "first_name",
            "last_name",
            "email",
            "phone",
            "reservation_time",
            "date",
            "num_players",
            "game",
        ]
        read_only_fields: list[str] = ["id", "game", "reservation_time"]
