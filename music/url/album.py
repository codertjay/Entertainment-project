from django.urls import path
from rest_framework.routers import DefaultRouter

# from .views import UserViewSets
from music.views import AlbumViewset

router = DefaultRouter()
router.register(r'', AlbumViewset, basename='album')

urlpatterns = router.urls
