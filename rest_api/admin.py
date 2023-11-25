from django.contrib import admin

# Register your models here.
from .models import Product, CustomUser

class ProductAdmin(admin.ModelAdmin):
    list_display = ('product', 'category', 'price')


class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'firebase_uid')

admin.site.register(Product, ProductAdmin)
admin.site.register(CustomUser, CustomUserAdmin)