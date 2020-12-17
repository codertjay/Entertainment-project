from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


user_choices = (
    ('Free', 'Free'),
    ('Paid', 'Paid'),
    ('Premium', 'Premium')

)


class User(AbstractUser):

    def __str__(self):
        return self.username


class ContactForm(models.Model):
    contact_name = models.CharField(max_length=50)
    contact_email = models.EmailField(max_length=50)
    contact_subject = models.CharField(max_length=50)
    contact_message = models.TextField()
    to_email = models.EmailField()
