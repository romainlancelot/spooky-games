from django.contrib.auth.models import User
from rest_framework import serializers

__all__: list[str] = ["UserSerializer"]


class UserSerializer(serializers.ModelSerializer):
    email: serializers.EmailField = serializers.EmailField(required=True)
    first_name: serializers.CharField = serializers.CharField(required=True)
    last_name: serializers.CharField = serializers.CharField(required=True)

    class Meta:
        model: type[User] = User
        fields: list[str] = [
            "id",
            "username",
            "password",
            "email",
            "first_name",
            "last_name",
            "is_staff",
            "is_active",
            "date_joined",
        ]
        read_only_fields: list[str] = ["id", "is_staff", "is_active", "date_joined"]
