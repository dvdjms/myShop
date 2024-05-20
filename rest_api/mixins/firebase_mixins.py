from ..authentication import FirebaseAuthentication

 
class FirebaseAuthenticationMixin:
    def get_authenticators(self):
        if self.request.method == 'GET':
            return []  # No authentication for GET requests
        else:
            return [FirebaseAuthentication()]
        