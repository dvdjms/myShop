from rest_framework.authentication import BaseAuthentication
from django.contrib.auth.models import User
from .models.models import CustomUser
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
            """Get the uid of a user"""
            try:
                  uid = decoded_token.get("uid")
                  email = decoded_token.get("email")
                  display_name = decoded_token.get('username')
            except Exception:
                  raise exceptions.FirebaseError()
            
            # """Get or create the user"""
            # this is redundant. User is added to database via fetch
            # try:
            #       print('firebase provider', decoded_token.get("sign_in_provider"))
            #       if decoded_token.get("sign_in_provider"):
            #             user = CustomUser.objects.get_or_create(username=display_name, email=email, firebase_uid=uid)
            #             print(decoded_token.get("sign_in_provider"))
            #             return user, None
            # except CustomUser.DoesNotExist:
            #       return None


            """Retrieve the user without creating it"""
            
            try:
                  user = CustomUser(username=display_name,email=email,firebase_uid=uid)
            except CustomUser.DoesNotExist:
                  return None
            return (user, None)
      
    