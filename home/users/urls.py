from django.urls import path
from rest_framework.routers import DefaultRouter

# from .views import UserViewSets
from .views import UserViewSets,ContactAPIView

router = DefaultRouter()
router.register(r'', UserViewSets, basename='users')

urlpatterns = router.urls
urlpatterns +=[
    path('contact/',ContactAPIView.as_view())
]
