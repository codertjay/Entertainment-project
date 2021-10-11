from django.shortcuts import render
from .serializers import MovieListSerializer, MovieDetailSerializer
from rest_framework.generics import ListAPIView, RetrieveAPIView, RetrieveUpdateAPIView,ListCreateAPIView
from .models import Movie
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly)
from blog.api.permissions import IsOwnerOrReadonly


class MovieListAPIView(ListCreateAPIView):
    serializer_class = MovieListSerializer
    filter_backnds = [SearchFilter]
    permission_classes = [AllowAny]
    search_fields = ['user__username', 'title', 'content']

    def get_queryset(self):
        query = self.request.GET.get('category')
        if query:
            print('this is the query ',query)
            query_list = Movie.objects.category(category=query)
            print('this is the query list',query_list)
        else:
            query_list = Movie.objects.none()
        return query_list


class MoveiDetailAPIView(RetrieveUpdateAPIView):
    serializer_class = MovieDetailSerializer
    lookup_field = 'pk'
    queryset = Movie.objects.all()
    permission_classes = [IsOwnerOrReadonly]

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

