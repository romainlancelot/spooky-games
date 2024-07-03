from django.contrib.auth.models import User
from rest_framework import serializers

__all__: list[str] = ["UserSerializer"]


class UserSerializer(serializers.ModelSerializer):
    email: serializers.EmailField = serializers.EmailField(required=True)
    first_name: serializers.CharField = serializers.CharField(required=True)
    last_name: serializers.CharField = serializers.CharField(required=True)
    password: serializers.CharField = serializers.CharField(
        required=True, write_only=True
    )

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
            "is_superuser",
            "is_active",
            "date_joined",
        ]
        read_only_fields: list[str] = [
            "id",
            "is_staff",
            "is_superuser",
            "is_active",
            "date_joined",
        ]

    def create(self, validated_data: dict) -> User:
        user: User = User.objects.create_user(**validated_data)
        return user

    def update(self, instance: User, validated_data: dict) -> User:
        for attr, value in validated_data.items():
            if attr == "password":
                instance.set_password(value)
                continue
            setattr(instance, attr, value)
        instance.save()
        return instance
