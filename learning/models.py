from django.db import models
from accounts.models import User

class LearningProgram(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    file = models.FileField(upload_to='learning/')
    created_at = models.DateTimeField(auto_now_add=True)
