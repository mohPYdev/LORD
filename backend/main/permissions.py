
from rest_framework import permissions
from rest_framework.permissions import SAFE_METHODS


class IsOwner(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        user = request.user
        return user.is_authenticated  and obj.user == user

    def has_permission(self, request, view): 
        return request.user and request.user.is_authenticated 