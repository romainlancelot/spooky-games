# Generated by Django 5.0.6 on 2024-07-01 15:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("reservations", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="game",
            name="price",
        ),
    ]
