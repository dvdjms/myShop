from rest_framework import generics
from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.core.serializers import serialize
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.views import APIView
from rest_api.serializers import UserSerializer, GroupSerializer, ProductSerializer, CustomUserSerializer
from rest_api.authentication import FirebaseAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Product, CustomUser


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
        # searchField = self.kwargs.get("procduct", "")
        product_data = Product.objects.all()
        return product_data
    


def signUp(request):
    return render(request, 'Login.html')



def getProducts(request):
    products = Product.objects.all()

    # Return a JSON response with the products
    # return JsonResponse({'products': products})
    # Get token
    # authorization_header = request.META.get('HTTP_AUTHORIZATION')
    # token = authorization_header.replace("Bearer ", "")
    # Verify token
    try:
        # decoded_token = auth.verify_id_token(token)
        # firebase_user_id = decoded_token['user_id']
        products = Product.objects.all()
        response_object = {"data": serialize("json", products)}
    except ValueError as e:
        return JsonResponse({"data": f"Invalid user token: {str(e)}"})
    return JsonResponse(response_object)


def getUser(request):
    products = User.objects.all()

    try:
        products = Product.objects.all()
        response_object = {"data": serialize("json", products)}
    except ValueError as e:
        return JsonResponse({"data": f"Invalid user token: {str(e)}"})
    return JsonResponse(response_object)

