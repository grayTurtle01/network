
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("addPost", views.addPost, name="addPost"),
    path("profile/<str:username>/<int:page_number>", views.profile, name="profile"),
    path("following/<int:page_number>", views.following, name="following"),
    path("follow_unfollow/<int:user_id>", views.follow_unfollow, name="follow_unfollow"),
    path("update_post", views.update_post, name="update_post"),
    path("like_unlike", views.like_unlike, name="like_unlike"),
    path("render_page_number/<int:page_number>", views.render_page_number, name="render_page_number"),
    path("get_posts/<int:page_number>", views.get_posts, name="get_posts"),
]
