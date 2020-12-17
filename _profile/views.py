from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.generics import CreateAPIView, ListAPIView

from .serializers import ProfileSerializer
from .models import Profile
from rest_framework.response import Response


class ProfileViewSets(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()


    # in this retrieve i would retrieve base on the username
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        print('instance',instance.user.username)
        print(instance.user)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)



