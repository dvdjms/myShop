from django.contrib import admin

# Register your models here.
from .models.models import Product, CustomUser, Image


class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'firebase_uid')


class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'category', 'price', 'firebase_uid')
    

class ImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'image_url', 'description', 'firebase_uid', 'product_id')

admin.site.register(Product, ProductAdmin)
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Image, ImageAdmin)