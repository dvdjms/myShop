from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class CustomUser(AbstractUser):
    # Add additional fields as needed
    firebase_uid = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add = True, null = True)
    updated_at = models.DateTimeField(auto_now_add = True, null = True)

    # Add related_name to avoid clashes with auth.User
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_groups',
        related_query_name='customuser',
        blank=True,
        verbose_name='groups',
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_permissions',
        related_query_name='customuser',
        blank=True,
        verbose_name='user permissions',
        help_text='Specific permissions for this user.',
    )


class Product(models.Model):
    name = models.CharField(max_length=32, blank=False)
    description = models.TextField(max_length=1024, blank=False, default="")
    category = models.CharField(max_length=32, blank=False)
    price = models.DecimalField(blank=False, max_digits=6, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add = True, null = True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)


class Image(models.Model):
    path = models.ImageField(max_length=255, blank=False)
    created_at = models.DateTimeField(auto_now_add = True, null = True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

