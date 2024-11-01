from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from .models import Note
from .serializers import NoteSerializer
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile


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

# def upload_audio_for_note(note, audio_file):
#     try:
#         print("uploading audio")
#         print("audio_file: ", audio_file)
#         # Step 1: Create a Recording associated with the given Note
#         recording = Note.objects.create(note=note, file=audio_file)
#
#         # Step 2: Return information about the created recording
#         return {
#             "message": "Audio uploaded successfully",
#             "recording_id": recording.id,
#             "file_url": recording.file.url,
#             "note_id": recording.note.id
#         }
#
#     except Exception as e:
#         # Handle any errors that occur during recording creation
#         return {"error": str(e)}
#
#
# @api_view(['POST'])
# def create_note(request):
#     # Step 1: Create a new Note instance
#     note_text = request.data.get("text", "")
#     note = Note.objects.create(text=note_text)
#     print("Note created", note)
#     # Step 2: Check if there's an audio file in the request
#     if 'file' in request.FILES:
#         # Call the function to handle audio upload and recording creation
#         upload_response = upload_audio_for_note(note, request.FILES['file'])
#         if 'error' in upload_response:
#             return JsonResponse(upload_response, status=400)
#     else:
#         upload_response = {"message": "Note created without audio"}
#
#     # Step 3: Combine the note creation response with the upload response
#     response_data = {
#         "note_id": note.id,
#         "note_text": note.text,
#         **upload_response
#     }
#     return JsonResponse(response_data, status=201)
#
#
# @api_view(['GET'])
# def list_recordings(request):
#     recordings = Recording.objects.all()
#     serializer = RecordingSerializer(recordings, many=True)
#
#     return Response(serializer.data)
#
#
# @api_view(['DELETE'])
# def delete_note(request, note_id):
#     try:
#         # Attempt to retrieve the Note by ID
#         note = Note.objects.get(id=note_id)
#
#         # Delete the Note (any associated Recordings are deleted automatically)
#         note.delete()
#
#         return JsonResponse({"message": "Note and recording deleted successfully"}, status=200)
#
#     except Note.DoesNotExist:
#         # If the note is not found, return a 404 error
#         return JsonResponse({"error": "Note not found"}, status=404)
