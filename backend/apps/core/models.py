from rest_framework.authentication import TokenAuthentication

__all__: list[str] = ["BearerToken"]


class BearerToken(TokenAuthentication):
    keyword: str = "Bearer"
