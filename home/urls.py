from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from blog.api.views import PostCreateApiView

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('admin/', admin.site.urls),

    # users
    path('users_api/', include('users.urls')),
    path('profile_api/', include('_profile.urls')),

    # music
    path('music_api/', include('music.url.music')),
    path('album_api/', include('music.url.album')),

    path('movie_api/',include('movie.url')),

    # blog
    path('blog_api/', include('blog.api.urls')),
    path('blog_api_create/', PostCreateApiView.as_view(), name='blog_api_create'),
    path('comments_api/', include('comments.api.urls'))

    # re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
