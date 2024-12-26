from django.db import models
from django.contrib.auth.models import User  # Import User model for author field

class Blog(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)  # Link to User model
    publication_date = models.DateTimeField(auto_now_add=True)  # Automatically set to the current date/time when created

    def __str__(self):
        return self.title
