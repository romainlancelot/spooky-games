from django.contrib.auth.models import User
from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework.request import Request
from rest_framework.views import APIView


class CanModifyUser(BasePermission):
    def has_object_permission(self, request: Request, _: APIView, obj: User) -> bool:
        if request.method in SAFE_METHODS:
            return True
        if request.user.is_superuser and not obj.is_superuser:
            return True
        if request.user.is_staff and not obj.is_staff and not obj.is_superuser:
            return True
        return obj == request.user


class IsAdminOrSuperUser(BasePermission):
    def has_permission(self, request: Request, _: APIView) -> bool:
        if request.method in SAFE_METHODS:
            return True
        return request.user.is_staff or request.user.is_superuser
