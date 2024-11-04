from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NoteViewSet
# , create_note, list_recordings, status, delete_note)

router = DefaultRouter()
router.register(r'', NoteViewSet, basename='note')

urlpatterns = [
    path('notes/', include(router.urls)),
]