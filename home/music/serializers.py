from rest_framework import serializers
from .models import Album, Music


class StringSerializer(serializers.StringRelatedField):

    def to_internal_value(self, data):
        return value


class AlbumSerializer(serializers.ModelSerializer):
    user = StringSerializer()

    class Meta:
        model = Album
        fields = ('user',
                  'album_name',
                  'album_content',
                  'artist_name',
                  'genres',
                  )


class MusicSerializer(serializers.ModelSerializer):
    user = StringSerializer()
    album = AlbumSerializer(read_only=True)
    class Meta:
        model = Music
        fields = (
            'user',
            'album',
            'music_content',
            'music_stream',
            'music_download',
            'artist_name',
            'genres',
        )
