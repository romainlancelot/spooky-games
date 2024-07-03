from typing import Any
from rest_framework import serializers
from apps.reservations.models import Game, Reservation, Participant
from apps.core.serializers import UserSerializer

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


class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model: type[Participant] = Participant
        fields: list[str] = ["id", "first_name", "last_name", "email"]
        read_only_fields: list[str] = ["id"]


class ReservationSerializer(serializers.ModelSerializer):
    game: GameSerializer = GameSerializer(read_only=True)
    owner: UserSerializer = UserSerializer(read_only=True)
    participants: ParticipantSerializer = ParticipantSerializer(many=True)

    class Meta:
        model: type[Reservation] = Reservation
        fields: list[str] = [
            "id",
            "reservation_time",
            "date",
            "num_players",
            "game",
            "owner",
            "participants",
        ]
        read_only_fields: list[str] = ["id", "game"]

    def validate(self, attrs: Any) -> Any:
        print(attrs)
        date: str = attrs["date"]
        reservation_time: str = attrs["reservation_time"]
        if Reservation.objects.filter(date=date, reservation_time=reservation_time):
            raise serializers.ValidationError("Reservation already exists.")
        print(attrs["num_players"], len(attrs["participants"]))
        if attrs["num_players"] != len(attrs["participants"]) + 1:  # due to owner
            raise serializers.ValidationError(
                "Number of players must match the number of participants."
            )
        return attrs

    def create(self, validated_data) -> Reservation:
        participants_data: list[dict] = validated_data.pop("participants")
        reservation: Reservation = Reservation.objects.create(**validated_data)
        for participant_data in participants_data:
            Participant.objects.create(reservation=reservation, **participant_data)
        return reservation
