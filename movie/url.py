from django.urls import path, include, re_path
from .views import MovieListAPIView, MoveiDetailAPIView

app_name='movie'
urlpatterns = [
    path('',MovieListAPIView.as_view(),name='movie_list_create'),
    path('<int:pk>/',MoveiDetailAPIView.as_view(),name='movie_detail_update')
]
