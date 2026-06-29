from django.urls import path
from . import views

urlpatterns = [
    path('', views.announcement_list, name='announcements'),
    path('create/', views.create_announcement, name='create_announcement'),
]