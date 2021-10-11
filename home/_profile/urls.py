from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import ProfileViewSets

router = DefaultRouter()
router.register(r'', ProfileViewSets, basename='profile')

urlpatterns = router.urls

