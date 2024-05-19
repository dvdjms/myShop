from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from rest_api.serializers.serializers import ImageSerializer
from rest_framework.response import Response
from ..models.models import Image
from django.views.generic import DeleteView
from ..mixins.firebase_mixins import FirebaseAuthenticationMixin
        
    
class ImageView(FirebaseAuthenticationMixin, generics.ListCreateAPIView):
    serializer_class = ImageSerializer
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        results = Image.objects.select_related('firebase_uid', 'product').all().order_by('id')
        return results
    
    def create_image_object(self, image_data, description, product_id, user):
        serializer = ImageSerializer(data = {
            'image_url': image_data,
            'description': description,
            'product_id': product_id,
            'firebase_uid': user,
        })
        serializer.is_valid(raise_exception=True)
        serializer.save()

    def post(self, request, *args, **kwargs):
        image_data = request.data.get('file')
        description = request.data.get('description')
        product_id = 2
        user = request.user
        try:
            image_object = self.create_image_object(image_data, description, product_id, user)
            response_data = {
                'message': 'Posted successfully',
                'data': ImageSerializer(image_object).data
            }
            return Response(response_data, status="201")
        except ValueError as e:
            return Response({'error': str(e)}, status="401")
        

class ImageDetailView(FirebaseAuthenticationMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer

    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance is None:
            return Response({"error": "Image not found."}, status=404)
        self.perform_destroy(instance)
        return Response({"message": "Image deleted successfully."}, status=204)

                  
