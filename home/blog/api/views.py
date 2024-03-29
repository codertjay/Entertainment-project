from django.db.models import Q
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    DestroyAPIView,
    UpdateAPIView,
    CreateAPIView,
    RetrieveUpdateAPIView)
from rest_framework.response import Response
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly)
from rest_framework.views import APIView
from .permissions import IsOwnerOrReadonly
from rest_framework.pagination import (
    LimitOffsetPagination,
    PageNumberPagination
)
from .pagination import PostLimitOffsetPagination, PostPageNumberPagination
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from blog.models import Post
from .serializers import (
    PostListSerializer,
    PostCreateUpdateSerializer,
    PostDetailSerializer)
import datetime
from rest_framework.filters import SearchFilter, OrderingFilter


class PostDetailApiView(RetrieveAPIView):
    queryset = Post.objects.published()
    serializer_class = PostDetailSerializer
    lookup_field = 'slug'
    permission_classes = [AllowAny]


class PostDeleteApiView(DestroyAPIView):
    queryset = Post.objects.published()
    serializer_class = PostListSerializer
    permission_classes = [IsOwnerOrReadonly]
    lookup_field = 'slug'

    def perform_destroy(self, serializer):
        serializer.delete(user=self.request.user)


class PostCreateApiView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostCreateUpdateSerializer

    def create(self, request, *args, **kwargs):
        print('the user', self.request)
        print('ther user', self.request)
        _data = self.request.data
        print('the data', _data)
        print('the data from data', _data['published_date'])
        serializer = PostDetailSerializer(data=_data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=HTTP_201_CREATED)
        else:
            print(serializer.errors)
        return Response({'message': 'there was an error procesing this request '}, status=HTTP_400_BAD_REQUEST)


def perform_create(self, serializer):
    print('the requested user', self.request.user)
    serializer.save(user=self.request.user)


class PostListApiView(ListAPIView):
    serializer_class = PostListSerializer
    filter_backends = [SearchFilter]
    search_fields = ['title',
                     'slug',
                     'description',
                     'user__username']
    pagination_class = PostPageNumberPagination
    permission_classes = [AllowAny]

    def get_queryset(self, *args, **kwargs):
        """ the reason why i comment this is because if there is a
        queryset then we in the class then we are going to use it
        but there is none so i am passing hte queryset in here """
        post = Post.objects.all()
        category = self.request.GET.get('category')
        print('this is the category', category)
        if category:
            query_list = post.filter(
                Q(category__icontains=category) |
                Q(category__iexact=category)
            ).distinct()
            print('the category show')
        else:
            query_list = Post.objects.all()
        return query_list


class PostUpdateApiView(RetrieveUpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostCreateUpdateSerializer
    lookup_field = 'slug'
    permission_classes = [IsOwnerOrReadonly]

    def update(self, request, *args, **kwargs):
        print('the user', self.request)
        print('the user', self.request.data)
        _data = self.request.data['data']

        print('the data', _data['image'])
        print('the data from data', _data['published_date'])
        published_date = _data['published_date']
        obj = Post.objects.get(slug=_data['slug'])
        print('the object', obj)
        if obj:
            print('the object', obj)
            serializer = PostDetailSerializer(obj, data=_data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(data=serializer.data, status=HTTP_201_CREATED)
            else:
                print(serializer.errors)
        return Response({'message': f'{serializer.errors}'})

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)


"""
obj = Post.objects.get(id=5)

data =   {
        "id": 6,
        "title": "Is it gonnna work",
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit." 
        "category": "L",
        "timestamp": "2020-06-03T09:30:24.430944Z"
    },
new_item = PostDetailSerializer(obj,data=data)
if new_item.is_valid():
    new.save()
else:
    print(new_item.errors)

"""
