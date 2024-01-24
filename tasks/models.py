from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    done = models.BooleanField(default=False)
    
    def __str__(self):
        return self.title


class User(models.Model):
    name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    name_user = models.CharField(max_length=50)
    email = models.EmailField()
    password = models.CharField(max_length=10)
    
    def __str__(self):
        return self.name_user
    