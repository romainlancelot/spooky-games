from django.urls import path, URLPattern
from rest_framework.authtoken.views import obtain_auth_token
from apps.core.views import LogoutView, RegisterView, AuthenticatedUserView

__all__: list[str] = ["urlpatterns"]

urlpatterns: list[URLPattern] = [
    path("users/login/", obtain_auth_token, name="login"),
    path("users/logout/", LogoutView.as_view(), name="logout"),
    path("users/register/", RegisterView.as_view(), name="register"),
    path("users/me/", AuthenticatedUserView.as_view(), name="me"),
]
