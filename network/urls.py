
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
]
