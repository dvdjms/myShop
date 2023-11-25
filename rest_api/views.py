from rest_framework import generics
from django.shortcuts import render


# Create your views here.
from django.http import JsonResponse
from django.core.serializers import serialize
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from rest_api.serializers import UserSerializer, GroupSerializer, ProductSerializer, CustomUserSerializer
from .models import Product, CustomUser
import firebase_admin
from firebase_admin import credentials, auth
from django.conf import settings
from rest_api.authentication import FirebaseAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response


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
    queryset = CustomUser.objects.all()
#####################################################
    # def update(self, request):
    #     username = request.data.get('display_name')
    #     firebase_uid = request.data.get('firebase_uid')

    #     if(username and firebase_uid):
    #         try:
    #             user = CustomUser.objects.get(firebase_uid=firebase_uid)
    #             user.username = username
    #             user.save()
    #             return Response({'message': 'Customer added successfully'}, status=status.HTTP_201_CREATED)
    #         except CustomUser.DoesNotExist:
    #             return JsonResponse({"message": "user not found"})
    #     return JsonResponse({"message": "user token is invalid"})



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






# class CustomerView(generics.ListAPIView, generics.CreateAPIView):
#     authentication_classes = [FirebaseAuthentication]
#     permission_classes = [IsAuthenticated]
#     serializer = CustomerSerializer      

#     def get_queryset(self):
#         # Your custom queryset logic here
#         return Customer.objects.all() 
    
#     def get_serializer_class(self):
#         # Your custom serializer logic here
#         return CustomerSerializer


    # def post(self, request):
    #     authorization_header = request.META.get('HTTP_AUTHORIZATION')
    #     token = authorization_header.replace("Bearer ", "")
    #     decoded_token = auth.verify_id_token(token)
    #     firebase_user_id = decoded_token['user_id']
    #     print(firebase_user_id)
    #     # customers = Customer.objects.all()
    #     # response_object = {"data": serialize("json", customers)}
    #     print('this and that', request.data.get('userIUD'))
    #     new_instance = {
    #         'id': request.data.get('userIUD'),
    #         'name': request.data.get('name', ''),
    #         'email': request.data.get('email', '')
    #     }
    #     serializer = CustomerSerializer(data=new_instance)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response({'message': 'Customer added successfully'}, status=status.HTTP_201_CREATED)

    #     return JsonResponse({"data": "user token is invalid"})




        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # """This api will handle student"""
    # permission_classes = [ IsAuthenticated ]
    # """Here just add FirebaseAuthentication class in authentication_classes"""
    # authentication_classes = [ FirebaseAuthentication ]
    # def get(self,request):
    #         data = Student.objects.all()
    #         serializer = StudentSerializer(data, many = True)
    #         response = {
    #                "status": status.HTTP_200_OK,
    #                "message": "success",
    #                "data": serializer.data
    #                }
    #         return Response(response, status = status.HTTP_200_OK)