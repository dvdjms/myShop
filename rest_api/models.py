from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class CustomUser(AbstractUser):
    # Add additional fields as needed
    username = models.CharField(max_length=255) # without this username must be unique and one word
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

    def __str__(self):
        return self.firebase_uid


class Product(models.Model):
    name = models.CharField(max_length=32, blank=False)
    description = models.TextField(max_length=1024, blank=False, default="")
    category = models.CharField(max_length=32, blank=False)
    price = models.DecimalField(blank=False, max_digits=6, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add = True, null = True)
    firebase_uid = models.ForeignKey(CustomUser, on_delete=models.CASCADE, to_field='firebase_uid', related_name='products')


def upload_to(instance, filename):
    return f'uploads/{filename}'

class Image(models.Model):
    image_url = models.ImageField(upload_to=upload_to)
    description = models.TextField(max_length=255, blank=False, default="")
    created_at = models.DateTimeField(auto_now_add = True, null = True)
    firebase_uid = models.ForeignKey(CustomUser, on_delete=models.CASCADE, to_field='firebase_uid', related_name='images')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, default=1)

