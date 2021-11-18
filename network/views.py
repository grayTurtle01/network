from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.http.response import JsonResponse
from django.shortcuts import render
from django.urls import reverse

from django.views.decorators.csrf import csrf_exempt
import json

from .models import User, Post

def index(request):
    posts = Post.objects.all().order_by('-timestamp')
    return render(request, "network/index.html", {'posts': posts})


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")

@csrf_exempt
def addPost(request):
    payload = json.loads(request.body)
    message = payload['message']

    post = Post.objects.create(creator=request.user, message=message)
    post.save()

    new_post = {
        'creator': post.creator.username,
        'message': message,
        'timestamp': post.timestamp,
        'likes': 0
    }

    #return HttpResponse('post added')
    return JsonResponse(new_post)

def show_profile(request, user_id):
    user = User.objects.get(pk=user_id)

    posts = Post.objects.filter(creator=user.id).order_by('-timestamp')

    return render(request, 'network/profile.html',{
        'username': user.username,
        'posts': posts,
        'followers': user.followers,
        'following': user.following
    })
    #return HttpResponse(user_id)