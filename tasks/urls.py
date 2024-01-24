from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from tasks import views

#versionado de api
router = routers.DefaultRouter()
router.register(r'tasks',views.TaskView, 'tasks')
router.register(r'users',views.UserView, 'users')

urlpatterns = [
    path("api/v1/", include(router.urls) ),
    path('docs/', include_docs_urls(title="Tasks API"))
     
]