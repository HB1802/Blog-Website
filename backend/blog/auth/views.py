
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.conf import settings
import jwt
from datetime import datetime, timedelta
from .serializers import UserSerializer, LoginSerializer, RegisterSerializer
import logging

logger = logging.getLogger(__name__)

def generate_token(user):
    """Generate JWT token for the user"""
    payload = {
        'user_id': user.id,
        'exp': datetime.utcnow() + timedelta(days=1),
        'iat': datetime.utcnow()
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    try:
        logger.info(f"Login attempt for user: {request.data.get('username')}")
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            
            user = authenticate(username=username, password=password)
            if user:
                token = generate_token(user)
                logger.info(f"Login successful for user: {username}")
                return Response({
                    'token': token,
                    'user': UserSerializer(user).data
                })
            
            logger.warning(f"Invalid credentials for user: {username}")
            return Response(
                {'error': 'Invalid credentials'}, 
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        logger.error(f"Login validation failed: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    except Exception as e:
        logger.error(f"Login error: {str(e)}", exc_info=True)
        return Response(
            {'error': 'Login failed'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    try:
        logger.info("Registration attempt")
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = generate_token(user)
            logger.info(f"Registration successful for user: {user.username}")
            return Response({
                'token': token,
                'user': UserSerializer(user).data
            }, status=status.HTTP_201_CREATED)
        
        logger.error(f"Registration validation failed: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    except Exception as e:
        logger.error(f"Registration error: {str(e)}", exc_info=True)
        return Response(
            {'error': 'Registration failed'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
