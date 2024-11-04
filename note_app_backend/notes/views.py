from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from .models import Note
from .serializers import NoteSerializer
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response


class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    lookup_field = 'id'

    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


@api_view(['GET'])
def status_check(request):
    if request.method == 'GET':
        print("status")
        return JsonResponse({
            "message": "Server is running"
        }, status=200)
