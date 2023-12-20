from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Product, CustomUser, Image


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
        fields = ('id', 'name', 'description', 'category', 'price', 'created_at', 'user')

class ImageSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

    class Meta:
        model = Image
        fields = ('id', 'path', 'created_at', 'user', 'product')

