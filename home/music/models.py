from django.db import models
from django.conf import settings


User = settings.AUTH_USER_MODEL



class Album(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,default=1)
    album_name = models.CharField(max_length=50)
    album_content = models.URLField()
    artist_name = models.CharField(max_length=50)
    genres = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)


class Music(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,default=1)
    album = models.ForeignKey(Album,on_delete=models.CASCADE)
    music_content = models.TextField()
    music_stream = models.URLField()
    music_download = models.URLField()
    artist_name = models.CharField(max_length=50)
    genres = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)


