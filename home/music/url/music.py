from django.urls import path
from rest_framework.routers import DefaultRouter

# from .views import UserViewSets
from music.views import MusicViewSet

router = DefaultRouter()
router.register(r'', MusicViewSet, basename='music')

urlpatterns = router.urls
