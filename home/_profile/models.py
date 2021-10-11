from django.db import models
from users.models import User
# Create your models here.
from django.conf import settings
from django.db.models.signals import post_save


class OtherSkill(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    skills = models.CharField(max_length=50)
    time_created = models.DateTimeField(auto_now_add=True)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    profile_pics = models.ImageField(upload_to='profile_pics', default='profile_pics/profile_pics.jpg')
    logo = models.ImageField(blank=True, null=True)
    background_image = models.ImageField(upload_to='background_image',
                                         default='background_image/background_image.jpeg')
    phone_number = models.IntegerField(blank=True, null=True)

    website = models.URLField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    twitter = models.URLField(blank=True, null=True)
    instagram = models.URLField(blank=True, null=True)

    skills = models.CharField(max_length=100, blank=True, null=True)
    about = models.TextField(blank=True, null=True)

    def __str__(self):
        return f'{self.user.username} '


class Testimonial(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    customer_name = models.CharField(max_length=50)
    url = models.URLField(blank=True, null=True)
    details = models.CharField(max_length=500)


class Layout(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)


def post_save_user_profile_create(sender, instance, created, *args, **kwargs):
    if created:
        Profile.objects.get_or_create(user=instance)
        Layout.objects.get_or_create(user=instance)
    user_profile, created = Profile.objects.get_or_create(user=instance)
    user_layout, created = Layout.objects.get_or_create(user=instance)


post_save.connect(post_save_user_profile_create, sender=settings.AUTH_USER_MODEL)
