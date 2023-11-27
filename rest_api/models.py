from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class CustomUser(AbstractUser):
    # Add additional fields as needed
    username = models.CharField(max_length = 100)
    email = models.EmailField(max_length = 277)
    firebase_uid = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add = True, null = True)
    updated_at = models.DateTimeField(auto_now_add = True, null = True)

    # Add related_name to avoid clashes with auth.User
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_set',
        related_query_name='customuser',
        blank=True,
        verbose_name='groups',
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_set',
        related_query_name='customuser',
        blank=True,
        verbose_name='user permissions',
        help_text='Specific permissions for this user.',
    )



class Product(models.Model):
    product = models.CharField(max_length=32, blank=False)
    category = models.CharField(max_length=32, blank=False)
    price = models.DecimalField(blank=False, max_digits=6, decimal_places=2)


