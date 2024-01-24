from django.shortcuts import render
from rest_framework import viewsets
from .serializer import TaskSerializer, UserSerializer
from .models import Task, User

class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    
class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    