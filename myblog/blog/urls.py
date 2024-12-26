from django.urls import path
from .views import UserBlogListView, BlogDetailView, LoginView, RegisterView

urlpatterns = [
    path('blogs/', UserBlogListView.as_view(), name='user_blogs'),
    path('blogs/<int:pk>/', BlogDetailView.as_view(), name='blog_detail'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
]
