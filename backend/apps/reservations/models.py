from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

__all__: list[str] = ["Game", "Reservation"]

RESERVATION_TIME_CHOICES: list[tuple[str, str]] = [
    ("10:00 - 12:00", "10:00 - 12:00"),
    ("12:00 - 14:00", "12:00 - 14:00"),
    ("14:00 - 16:00", "14:00 - 16:00"),
    ("16:00 - 18:00", "16:00 - 18:00"),
    ("18:00 - 20:00", "18:00 - 20:00"),
]


class Game(models.Model):
    id: models.AutoField = models.AutoField(primary_key=True)
    name: models.CharField = models.CharField(max_length=100)
    image: models.ImageField = models.ImageField(upload_to="images/")
    description: models.TextField = models.TextField()
    max_players: models.IntegerField = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(6)]
    )
    created_at: models.DateTimeField = models.DateTimeField(auto_now_add=True)
    updated_at: models.DateTimeField = models.DateTimeField(auto_now=True)


class Reservation(models.Model):
    id: models.AutoField = models.AutoField(primary_key=True)
    reservation_time: models.CharField = models.CharField(
        max_length=100, choices=RESERVATION_TIME_CHOICES
    )
    date: models.DateField = models.DateField()
    num_players: models.IntegerField = models.IntegerField()
    game: models.ForeignKey = models.ForeignKey(
        Game, on_delete=models.CASCADE, related_name="reservations"
    )
