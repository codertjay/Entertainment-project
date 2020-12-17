from django.shortcuts import render
from rest_framework import viewsets
from .models import Music, Album
from .serializers import AlbumSerializer, MusicSerializer


class MusicViewSet(viewsets.ModelViewSet):
    serializer_class = MusicSerializer
    queryset = Music.objects.all()


class AlbumViewset(viewsets.ModelViewSet):
    serializer_class = AlbumSerializer
    queryset = Album.objects.all()


