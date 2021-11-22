from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.http.response import JsonResponse
from django.shortcuts import render
from django.urls import reverse

from django.views.decorators.csrf import csrf_exempt
import json

from .models import Follow, User, Post, Like

from django.core.paginator import Paginator

post_by_page = 2

def index(request):
    posts = Post.objects.all().order_by('-timestamp')

    p = Paginator(posts, post_by_page)
    page1 = p.page(1)

    try:
        likes_given = Like.objects.filter(creator=request.user)
    
    # Anonymus user
    except:
        likes_given = []

    posts_liked = []
    for like in likes_given:
        post_id = like.post_id
        posts_liked.append(post_id)

    return render(request, "network/index.html", {
                                #'posts': posts,
                                'posts': page1.object_list,
                                'posts_liked': posts_liked,
                                'range': p.page_range
                            })


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

def profile(request, username):
    profile_user = User.objects.get(username=username)
    user_id = profile_user.id

    posts = Post.objects.filter(creator=profile_user.id).order_by('-timestamp')

    # Follow
    is_followed = False

    try:
        follow = Follow.objects.get(creator=request.user,
                                    target=profile_user)
        is_followed = True

    except:
        is_followed = False

    # Likes
    try:
        likes_given = Like.objects.filter(creator=request.user)
    except:
        likes_given = []

    posts_liked = []
    for like in likes_given:
        post_id = like.post_id
        posts_liked.append(post_id)

    return render(request, 'network/profile.html',{
        'username': profile_user.username,
        'user_id': user_id,
        'posts': posts,
        'followers': Follow.objects.filter(target=profile_user.id).count(),
        'following': Follow.objects.filter(creator=profile_user.id).count(),
        'is_followed': is_followed,
        'posts_liked' : posts_liked
    })

        
def follow_unfollow(request, user_id):
   
    # Unfollow
    try:
        follow = Follow.objects.get(creator=request.user, 
                                    target=User.objects.get(pk=user_id))

        follow.delete()

        return JsonResponse({
            'message': 'unfollow'
         })

    # Follow
    except:
        f = Follow(creator=request.user, target=User.objects.get(pk=user_id))
        f.save()

        return JsonResponse({
            'message': 'follow'
        })

def following(request, page_number):
    
    follows = Follow.objects.filter(creator=request.user)

    targets = []
    for follow in follows:
        targets.append(follow.target)

    posts = Post.objects.filter(creator__in=targets).order_by('-timestamp')

    #Paginator
    p = Paginator(posts, post_by_page)
    #page_number = 1
    page = p.page(page_number)

    # Likes
    likes_given = Like.objects.filter(creator=request.user)
    
    posts_liked = []
    for like in likes_given:
        post_id = like.post_id
        posts_liked.append(post_id)


    return render(request, 'network/following.html',{
        'posts': page.object_list,
        'posts_liked': posts_liked,
        'range': p.page_range

    })

@csrf_exempt
def update_post(request):
    payload = json.loads(request.body)

    post_id = payload['post_id']
    new_message = payload['new_message']

    post = Post.objects.get(pk=post_id)

    if request.user == post.creator:
        post.message = new_message
        post.save()

        return HttpResponse("Post updated")
        
    else:
        return HttpResponse("Invalid User")

@csrf_exempt
def like_unlike(request):
    payload = json.loads(request.body)

    post_id = int(payload['post_id'])
  
    post = Post.objects.get(pk=post_id)

    try:
        like = Like.objects.get(creator=request.user, target=post.creator, post_id=post_id)
        like.delete()
        post.likes += -1
        post.save()
        return JsonResponse({'likes': post.likes,
                             'message': "Like removed"})
        
    except:
        like = Like(creator=request.user, target=post.creator, post_id=post_id)
        like.save()
        post.likes += 1
        post.save()
        return JsonResponse({'likes': post.likes,
                             'message': "Like added"})


def render_page_number(request, page_number):
    posts = Post.objects.all().order_by('-timestamp')

    p = Paginator(posts, post_by_page)
    page1 = p.page(page_number)
    pages = p.num_pages

    try:
        likes_given = Like.objects.filter(creator=request.user)
    
    # Anonymus user
    except:
        likes_given = []

    posts_liked = []
    for like in likes_given:
        post_id = like.post_id
        posts_liked.append(post_id)

    return render(request, "network/index.html", {
                                #'posts': posts,
                                'posts': page1.object_list,
                                'posts_liked': posts_liked,
                                'pages': pages,
                                'range': p.page_range
                            })    



def get_posts(request, page_number):
    print(' --> conection')
    posts = Post.objects.all().order_by('-timestamp')

    p = Paginator(posts, post_by_page)
    page = p.page(page_number)

    posts = list(page.object_list)

    return JsonResponse({'posts': posts})

    

        
    