from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.fields.related import ForeignKey


class User(AbstractUser):
    followers = models.IntegerField(default=0)
    following = models.IntegerField(default=0)
    image_url = models.CharField(max_length=300, default="https://www.alphr.com/wp-content/uploads/2020/10/twitter.png")

    def serialize(self):
        return{
            'id': self.id,
            'username': self.username,
            'followers': self.followers,
            'following': self.following,
            'image_url': self.image_url
        }

class Post(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.CharField(max_length=128)
    timestamp = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.message} | {self.creator}"
    
    def serialize(self):
        return{
            'id': self.id,
            'creator': self.creator.username,
            'message': self.message,
            'timestamp': self.timestamp.strftime("%b %d %Y, %I:%M %p"),
            'likes': self.likes,
            'creator_image': self.creator.image_url
        }
        
class Follow(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="creators")
    target  = models.ForeignKey(User, on_delete=models.CASCADE, related_name="targets")

class Like(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sources")
    target  = models.ForeignKey(User, on_delete=models.CASCADE, related_name="destinies")
    post_id = models.IntegerField(default=0)
