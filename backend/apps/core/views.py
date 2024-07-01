from typing import Any
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status, generics
from apps.core.serializers import UserSerializer

__all__: list[str] = ["LogoutView"]


class LogoutView(APIView):
    permission_classes: list[BasePermission] = [IsAuthenticated]

    def post(self, request: Request) -> None:
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)


class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes: list[Any] = []
