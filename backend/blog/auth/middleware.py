from django.contrib.auth.models import User
from rest_framework import authentication
from rest_framework import exceptions
import jwt
from django.conf import settings

class JWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return None

        try:
            # Extract the token
            token = auth_header.split(' ')[1]
            
            # Decode the token
            payload = jwt.decode(
                token, 
                settings.SECRET_KEY, 
                algorithms=['HS256']
            )
            
            # Get the user
            user = User.objects.get(id=payload['user_id'])
            
            return (user, None)
            
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('Token has expired')
        except (jwt.InvalidTokenError, User.DoesNotExist, IndexError):
            raise exceptions.AuthenticationFailed('Invalid token')
        except Exception as e:
            print(f"Authentication error: {str(e)}")
            raise exceptions.AuthenticationFailed('Authentication failed')