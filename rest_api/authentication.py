from rest_framework.authentication import BaseAuthentication
from django.contrib.auth.models import User
from . models import CustomUser
import firebase_admin
from firebase_admin import credentials, auth
from django.conf import settings
from rest_api import exceptions

firebase_creds = credentials.Certificate(settings.FIREBASE_CONFIG)
firebase_app = firebase_admin.initialize_app(firebase_creds)

# default_app = firebase_admin.initialize_app(cred)
"""FIREBASE AUTHENTICATION"""
class FirebaseAuthentication(BaseAuthentication):
      """override authenticate method and write our custom firebase authentication."""
      def authenticate(self, request):
            """Get the authorization Token, It raise exception when no authorization Token is given"""
            auth_header = request.META.get("HTTP_AUTHORIZATION")
            if not auth_header:
                  raise exceptions.NoAuthToken("No auth token provided")
            """Decoding the Token It rasie exception when decode failed."""
            id_token = auth_header.split(" ").pop()
            decoded_token = None
            try:
                  decoded_token = auth.verify_id_token(id_token)
            except Exception:
                  raise exceptions.InvalidAuthToken("Invalid auth token")
            """Return Nothing"""
            if not id_token or not decoded_token:
                  return None
            """Get the uid of an user"""
            try:
                  uid = decoded_token.get("uid")
                  email = decoded_token.get("email")
                  display_name = request.data.get('display_name')
            except Exception:
                  raise exceptions.FirebaseError()
            """Get or create the user"""
            user, created = CustomUser.objects.get_or_create(username=display_name,email=email,firebase_uid=uid)
            return (user, None)
      
    


# from rest_framework.authentication import BaseAuthentication
# from rest_framework.exceptions import AuthenticationFailed
# from firebase_admin import auth
# from .models import Customer

# class FirebaseAuthentication(BaseAuthentication):
#     def authenticate(self, request):
#         authorization_header = request.META.get('HTTP_AUTHORIZATION')
#         if not authorization_header:
#             return None

#         try:
#             token = authorization_header.split('Bearer ')[1]
#             decoded_token = auth.verify_id_token(token)
#             user_id = decoded_token['user_id']
#             # You can fetch the user or other relevant information from your database
#             user = Customer.objects.get(firebase_user_id=user_id)
#             return (user_id, None)
#         except Exception as e:
#             raise AuthenticationFailed('Invalid Firebase ID token')

#     def authenticate_header(self, request):
#         return 'Bearer'