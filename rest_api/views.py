from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import render
# Create your views here.
from django.http import JsonResponse
from django.core.serializers import serialize
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.views import APIView
from rest_api.serializers import UserSerializer, GroupSerializer, ProductSerializer, CustomUserSerializer, ImageSerializer
from rest_api.authentication import FirebaseAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Product, CustomUser, Image
from django.views.generic import DeleteView

class FirebaseAuthenticationMixin:
    def get_authenticators(self):
        if self.request.method == 'GET':
            return []  # No authentication for GET requests
        else:
            return [FirebaseAuthentication()]
        

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class CustomUserViewSet(viewsets.ModelViewSet):
    authentication_classes = [FirebaseAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all().order_by('id')  # Order by some field like 'id'

    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Customer added successfully'}, status=201)
        return JsonResponse({"data": "user token is invalid"})


class CurrentUserView(APIView):
    authentication_classes = [FirebaseAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = CustomUserSerializer

    def get(self, request):
        firebaseUID = request.user.firebase_uid
        username = CustomUser.objects.filter(firebase_uid=firebaseUID).values('username').first()
        if username:
            return Response({'username': username['username']})
        else:
            return Response({"detail": "User not found."}, status=404)


class ProductView(generics.ListAPIView):
    serializer_class = ProductSerializer
    def get_queryset(self):
        return Product.objects.all().order_by('id')
    

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

                  
