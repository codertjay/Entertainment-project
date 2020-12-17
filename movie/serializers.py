from rest_framework.serializers import ModelSerializer
from .models import Movie
from users.serializers import StringSerializer


class MovieListSerializer(ModelSerializer):
    user = StringSerializer(read_only=True)

    class Meta:
        model = Movie
        fields = [
            'user',
            'title',
            'content',
            'image',
            'category',
            'timestamp',

        ]


class MovieDetailSerializer(ModelSerializer):
    user = StringSerializer()

    class Meta:
        model = Movie
        fields = [
            'user',
            'title',
            'category',
            'content',
            'timestamp',
        ]
