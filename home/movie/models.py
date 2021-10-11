from django.db import models
from django.conf import settings
from django.db.models import Q

user = settings.AUTH_USER_MODEL


class MovieCategoryQueryset(models.QuerySet):
    def category(self, category):
        print(' did the category reach this place', category)
        return self.filter(category__icontains=category)


class MovieCategoryManager(models.Manager):
    def get_queryset(self):
        return MovieCategoryQueryset(self.model, using=self._db)

    def category(self, category):
        print('this is the category comming in ', category)
        return self.filter(
            Q(category__icontains=category) |
            Q(user__username__icontains=category) |
            Q(title__icontains=category)
        ).distinct()


movieCategory = (
    ('Action', 'Action'),
    ('Comedy', 'Comedy'),
    ('Romance', 'Romance'),
)


class Movie(models.Model):
    user = models.ForeignKey(user, on_delete=models.CASCADE, default=1)
    image = models.ImageField(upload_to='movie', blank=True, null=True)
    title = models.CharField(max_length=100)
    category = models.CharField(choices=movieCategory, max_length=50, default='Action')
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now=True)
    objects = MovieCategoryManager()

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f'{self.title}-- by {self.user.username}'
