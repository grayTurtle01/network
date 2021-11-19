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

    def __str__(self):
        return f"{self.message} | {self.creator}"
        
class Follow(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="creators")
    target  = models.ForeignKey(User, on_delete=models.CASCADE, related_name="targets")

class Like(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sources")
    target  = models.ForeignKey(User, on_delete=models.CASCADE, related_name="destinies")
    post_id = models.IntegerField(default=0)
