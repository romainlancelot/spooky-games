from typing import Any
from django.contrib.auth.models import User
from django.db.models.query import QuerySet
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status, generics
from apps.core.serializers import UserSerializer, AdminSerializer
from apps.core.permissions import IsAdminOrSuperUser, CanModifyUser
from apps.reservations.models import Reservation
from apps.reservations.serializers import ReservationSerializer

__all__: list[str] = [
    "LogoutView",
    "RegisterView",
    "AuthenticatedUserView",
    "UserReservationList",
    "AdminUserView",
    "AdminUserDetailView",
]


class LogoutView(APIView):
    permission_classes: list[BasePermission] = [IsAuthenticated]

    def post(self, request: Request) -> None:
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)


class RegisterView(generics.CreateAPIView):
    queryset: QuerySet[User] = User.objects.all()
    serializer_class: type[UserSerializer] = UserSerializer  # type: ignore
    authentication_classes: list[Any] = []


class AuthenticatedUserView(APIView):
    permission_classes: list[BasePermission] = [IsAuthenticated, CanModifyUser]

    def get(self, request: Request) -> Response:
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def patch(self, request: Request) -> Response:
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request: Request) -> Response:
        request.user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AdminUserView(generics.ListAPIView):
    queryset: QuerySet[User] = User.objects.all()
    serializer_class: type[UserSerializer] = UserSerializer  # type: ignore
    permission_classes: list[BasePermission] = [IsAuthenticated, CanModifyUser]
    filter_backends: list[Any] = [filters.SearchFilter]
    search_fields: list[str] = ["username", "email"]


class AdminUserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset: QuerySet[User] = User.objects.all()
    serializer_class: type[AdminSerializer] = AdminSerializer
    permission_classes: list[BasePermission] = [IsAuthenticated, IsAdminOrSuperUser]


class UserReservationList(generics.ListAPIView):
    serializer_class: type[ReservationSerializer] = ReservationSerializer
    permission_classes: list[BasePermission] = [IsAuthenticated]

    def get_queryset(self) -> QuerySet[Reservation]:
        return Reservation.objects.filter(owner=self.request.user)
