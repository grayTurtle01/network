
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("addPost", views.addPost, name="addPost"),
    path("show_profile/<int:user_id>", views.show_profile, name="show_profile"),
    path("show_following", views.show_following, name="show_following"),
    path("follow_unfollow/<int:user_id>", views.follow_unfollow, name="follow_unfollow"),
    path("update_post", views.update_post, name="update_post"),
    path("like_unlike", views.like_unlike, name="like_unlike"),
    path("render_page_number/<int:page_number>", views.render_page_number, name="render_page_number"),
]
