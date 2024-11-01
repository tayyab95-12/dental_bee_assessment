from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NoteViewSet
# , create_note, list_recordings, status, delete_note)

router = DefaultRouter()
router.register(r'', NoteViewSet, basename='note')

urlpatterns = [
    path('notes/', include(router.urls)),
    # path('status/', status, name='status'),
    # path('create_note/', create_note, name='create_note'),
    # path('recordings/', list_recordings, name='list-recordings'),
    # path('delete_note/<int:note_id>/', delete_note, name='delete-note'),
]