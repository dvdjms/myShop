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
    

class ImageView(generics.ListCreateAPIView):
    serializer_class = ImageSerializer
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        if self.request.method == 'GET':
            results = Image.objects.select_related('firebase_uid', 'product').all().order_by('id')
            return results
        return Image.objects.none()
    
    def post(self, request, *args, **kwargs):
        if request.method == 'POST':
            # check image size
            image_data = request.data['file']
            description = request.data['description']
            product_id = 2
            serializer = ImageSerializer(data = {
                'image_url': image_data,
                'description': description,
                'product_id': product_id,
                'firebase_uid': request.user.firebase_uid,
            })
            if serializer.is_valid():
                serializer.save()
                response_data = {
                    'message': 'Posted successfully',
                    'data': serializer.data
                }
                return Response(response_data, status="201")
            error_message = str(serializer.errors)
            return Response({'error': error_message}, status="401")
        return Response("Not authenticated") 
        
    def get_authenticators(self):
        if self.request.method == 'GET':
            return []  # No authentication for GET requests
        else:
            return [FirebaseAuthentication()] 
    

class ImageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance is None:
            return Response({"error": "Image not found."}, status=404)
        self.perform_destroy(instance)
        return Response({"message": "Image deleted successfully."}, status=204)

                  
    def get_authenticators(self):
        if self.request.method == 'GET':
            return []  # No authentication for GET requests
        else:
            return [FirebaseAuthentication()] 


# def signUp(request):
#     return render(request, 'Login.html')


# def getUser(request):
#     products = User.objects.all()
#     try:
#         products = Product.objects.all()
#         response_object = {"data": serialize("json", products)}
#     except ValueError as e:
#         return JsonResponse({"data": f"Invalid user token: {str(e)}"})
#     return JsonResponse(response_object)

