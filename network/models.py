from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.fields.related import ForeignKey


class User(AbstractUser):
    followers = models.IntegerField(default=0)
    following = models.IntegerField(default=0)

class Post(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.CharField(max_length=128)
    timestamp = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)