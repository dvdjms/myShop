from django.contrib import admin

# Register your models here.
from .models import Product, CustomUser, Image


class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'firebase_uid')


class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'category', 'price', 'user')
    

class ImageAdmin(admin.ModelAdmin):
    list_display = ('path', 'user', 'product')

admin.site.register(Product, ProductAdmin)
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Image, ImageAdmin)