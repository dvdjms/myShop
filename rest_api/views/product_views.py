from rest_framework import generics
from ..serializers.serializers import ProductSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ..models.models import Product
from django.views.generic import DeleteView
from ..mixins.firebase_mixins import FirebaseAuthenticationMixin
        

class ProductView(generics.ListAPIView):
    serializer_class = ProductSerializer
    def get_queryset(self):
        return Product.objects.all().order_by('id')
    
