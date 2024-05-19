from django.contrib.auth.models import User, Group
from requests import request
from rest_framework import serializers
from ..models.models import Product, CustomUser, Image


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'name', 'email', 'groups']

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
            model = CustomUser
            fields = ['id', 'username', 'email', 'firebase_uid', 'created_at', 'updated_at']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'category', 'price', 'created_at', 'firebase_uid')

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('id', 'image_url', 'description', 'created_at', 'firebase_uid', 'product_id')


