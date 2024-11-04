
from django.db import models
from django.contrib.auth.models import User


class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    recording_file = models.FileField(upload_to="recordings/")
    created_at = models.DateTimeField(auto_now_add=True)


