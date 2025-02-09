from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django.utils.text import slugify
from blog.models import Article, Comment
from .serializers import ArticleSerializer, CommentSerializer
import logging

logger = logging.getLogger(__name__)

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    
    def get_permissions(self):
        """
        Instantiate and return the list of permissions that this view requires.
        """
        if self.action in ['create', 'update', 'partial_update', 'destroy', 'comments']:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]
    
    def create(self, request, *args, **kwargs):
        try:
            # Log request data for debugging
            logger.info(f"Request data: {request.data}")
            logger.info(f"Request FILES: {request.FILES}")
            logger.info(f"Request user: {request.user}")
            logger.info(f"Request headers: {request.headers}")
            
            # Create a mutable copy of the data
            data = request.data.copy()
            
            # Generate slug from title
            title = data.get('title', '')
            slug = slugify(title)
            
            # Calculate read time (rough estimate: 200 words per minute)
            content = data.get('content', '')
            word_count = len(content.split())
            read_time = f"{max(1, round(word_count / 200))} min read"
            
            # Add computed fields
            data['slug'] = slug
            data['read_time'] = read_time
            data['status'] = 'pending'
            
            # Create serializer with modified data
            serializer = self.get_serializer(data=data)
            if not serializer.is_valid():
                logger.error(f"Validation errors: {serializer.errors}")
                return Response(
                    serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Save with author
            self.perform_create(serializer)
            
            headers = self.get_success_headers(serializer.data)
            return Response(
                serializer.data, 
                status=status.HTTP_201_CREATED, 
                headers=headers
            )
            
        except Exception as e:
            logger.error(f"Error creating article: {str(e)}", exc_info=True)
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=True, methods=['get', 'post'])
    def comments(self, request, pk=None):
        """Handle comments for an article - both listing and creating"""
        try:
            article = self.get_object()
            
            if request.method == 'GET':
                # Get all comments for the article
                comments = article.comments.all()
                serializer = CommentSerializer(comments, many=True)
                return Response(serializer.data)
            
            elif request.method == 'POST':
                # Create a serializer instance with the request data
                serializer = CommentSerializer(data=request.data)
                if not serializer.is_valid():
                    return Response(
                        serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST
                    )
                
                # Save the comment with the article and user
                serializer.save(
                    article=article,
                    user=request.user
                )
                
                return Response(serializer.data, status=status.HTTP_201_CREATED)
                
        except Exception as e:
            logger.error(f"Error handling comments: {str(e)}", exc_info=True)
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

# from rest_framework import viewsets, permissions, status
# from rest_framework.response import Response
# from rest_framework.decorators import action
# from rest_framework.parsers import MultiPartParser, FormParser
# from django.utils.text import slugify
# from blog.models import Article, Comment
# from .serializers import ArticleSerializer, CommentSerializer
# import logging

# logger = logging.getLogger(__name__)

# class ArticleViewSet(viewsets.ModelViewSet):
#     queryset = Article.objects.all()
#     serializer_class = ArticleSerializer
#     parser_classes = (MultiPartParser, FormParser)
    
#     def get_permissions(self):
#         """
#         Instantiate and return the list of permissions that this view requires.
#         """
#         if self.action in ['create', 'update', 'partial_update', 'destroy', 'comments']:
#             permission_classes = [permissions.IsAuthenticated]
#         else:
#             permission_classes = [permissions.AllowAny]
#         return [permission() for permission in permission_classes]
    
#     def create(self, request, *args, **kwargs):
#         try:
#             # Log request data for debugging
#             logger.info(f"Request data: {request.data}")
#             logger.info(f"Request FILES: {request.FILES}")
#             logger.info(f"Request user: {request.user}")
#             logger.info(f"Request headers: {request.headers}")
            
#             # Create a mutable copy of the data
#             data = request.data.copy()
            
#             # Generate slug from title
#             title = data.get('title', '')
#             slug = slugify(title)
            
#             # Calculate read time (rough estimate: 200 words per minute)
#             content = data.get('content', '')
#             word_count = len(content.split())
#             read_time = f"{max(1, round(word_count / 200))} min read"
            
#             # Add computed fields
#             data['slug'] = slug
#             data['read_time'] = read_time
#             data['status'] = 'pending'
            
#             # Create serializer with modified data
#             serializer = self.get_serializer(data=data)
#             if not serializer.is_valid():
#                 logger.error(f"Validation errors: {serializer.errors}")
#                 return Response(
#                     serializer.errors,
#                     status=status.HTTP_400_BAD_REQUEST
#                 )
            
#             # Save with author
#             self.perform_create(serializer)
            
#             headers = self.get_success_headers(serializer.data)
#             return Response(
#                 serializer.data, 
#                 status=status.HTTP_201_CREATED, 
#                 headers=headers
#             )
            
#         except Exception as e:
#             logger.error(f"Error creating article: {str(e)}", exc_info=True)
#             return Response(
#                 {'error': str(e)},
#                 status=status.HTTP_400_BAD_REQUEST
#             )
    
#     def perform_create(self, serializer):
#         serializer.save(author=self.request.user)

#     @action(detail=True, methods=['get', 'post'])
#     def comments(self, request, pk=None):
#         """Handle comments for an article - both listing and creating"""
#         try:
#             article = self.get_object()
            
#             if request.method == 'GET':
#                 # Get all comments for the article
#                 comments = article.comments.all()
#                 serializer = CommentSerializer(comments, many=True)
#                 return Response(serializer.data)
            
#             elif request.method == 'POST':
#                 # Validate required fields
#                 content = request.data.get('content')
#                 rating = request.data.get('rating', 5)
                
#                 if not content or not content.strip():
#                     return Response(
#                         {'error': 'Comment content is required'},
#                         status=status.HTTP_400_BAD_REQUEST
#                     )
                
#                 try:
#                     rating = int(rating)
#                     if not (1 <= rating <= 5):
#                         raise ValueError()
#                 except (TypeError, ValueError):
#                     return Response(
#                         {'error': 'Rating must be between 1 and 5'},
#                         status=status.HTTP_400_BAD_REQUEST
#                     )
                
#                 # Create comment
#                 comment = Comment.objects.create(
#                     article=article,
#                     user=request.user,
#                     content=content,
#                     rating=rating
#                 )
                
#                 # Return the created comment
#                 serializer = CommentSerializer(comment)
#                 return Response(serializer.data, status=status.HTTP_201_CREATED)
                
#         except Exception as e:
#             logger.error(f"Error handling comments: {str(e)}", exc_info=True)
#             return Response(
#                 {'error': str(e)},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

# from rest_framework import viewsets, permissions, status
# from rest_framework.response import Response
# from rest_framework.decorators import action
# from rest_framework.parsers import MultiPartParser, FormParser
# from django.utils.text import slugify
# from blog.models import Article, Comment
# from .serializers import ArticleSerializer, CommentSerializer
# import logging

# logger = logging.getLogger(__name__)

# class ArticleViewSet(viewsets.ModelViewSet):
#     queryset = Article.objects.all()
#     serializer_class = ArticleSerializer
#     parser_classes = (MultiPartParser, FormParser)
    
#     def get_permissions(self):
#         """
#         Instantiate and return the list of permissions that this view requires.
#         """
#         if self.action in ['create', 'update', 'partial_update', 'destroy', 'add_comment']:
#             permission_classes = [permissions.IsAuthenticated]
#         else:
#             permission_classes = [permissions.AllowAny]
#         return [permission() for permission in permission_classes]
    
#     def create(self, request, *args, **kwargs):
#         try:
#             # Log request data for debugging
#             logger.info(f"Request data: {request.data}")
#             logger.info(f"Request FILES: {request.FILES}")
#             logger.info(f"Request user: {request.user}")
#             logger.info(f"Request headers: {request.headers}")
            
#             # Create a mutable copy of the data
#             data = request.data.copy()
            
#             # Generate slug from title
#             title = data.get('title', '')
#             slug = slugify(title)
            
#             # Calculate read time (rough estimate: 200 words per minute)
#             content = data.get('content', '')
#             word_count = len(content.split())
#             read_time = f"{max(1, round(word_count / 200))} min read"
            
#             # Add computed fields
#             data['slug'] = slug
#             data['read_time'] = read_time
#             data['status'] = 'pending'
            
#             # Create serializer with modified data
#             serializer = self.get_serializer(data=data)
#             if not serializer.is_valid():
#                 logger.error(f"Validation errors: {serializer.errors}")
#                 return Response(
#                     serializer.errors,
#                     status=status.HTTP_400_BAD_REQUEST
#                 )
            
#             # Save with author
#             self.perform_create(serializer)
            
#             headers = self.get_success_headers(serializer.data)
#             return Response(
#                 serializer.data, 
#                 status=status.HTTP_201_CREATED, 
#                 headers=headers
#             )
            
#         except Exception as e:
#             logger.error(f"Error creating article: {str(e)}", exc_info=True)
#             return Response(
#                 {'error': str(e)},
#                 status=status.HTTP_400_BAD_REQUEST
#             )
    
#     def perform_create(self, serializer):
#         serializer.save(author=self.request.user)

#     @action(detail=True, methods=['post'])
#     def add_comment(self, request, pk=None):
#         """Add a comment to an article"""
#         try:
#             article = self.get_object()
            
#             # Create comment data
#             comment_data = {
#                 'article': article,
#                 'user': request.user,
#                 'content': request.data.get('content'),
#                 'rating': request.data.get('rating', 5)
#             }
            
#             # Validate rating
#             if not (1 <= comment_data['rating'] <= 5):
#                 return Response(
#                     {'error': 'Rating must be between 1 and 5'},
#                     status=status.HTTP_400_BAD_REQUEST
#                 )
            
#             # Create comment
#             comment = Comment.objects.create(**comment_data)
            
#             # Serialize and return the comment
#             serializer = CommentSerializer(comment)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
            
#         except Exception as e:
#             logger.error(f"Error adding comment: {str(e)}", exc_info=True)
#             return Response(
#                 {'error': str(e)},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#     @action(detail=True, methods=['get'])
#     def comments(self, request, pk=None):
#         """Get all comments for an article"""
#         try:
#             article = self.get_object()
#             comments = article.comments.all()
#             serializer = CommentSerializer(comments, many=True)
#             return Response(serializer.data)
#         except Exception as e:
#             logger.error(f"Error fetching comments: {str(e)}", exc_info=True)
#             return Response(
#                 {'error': str(e)},
#                 status=status.HTTP_400_BAD_REQUEST
#             )


# from rest_framework import viewsets, permissions, status
# from rest_framework.response import Response
# from rest_framework.parsers import MultiPartParser, FormParser
# from django.utils.text import slugify
# from blog.models import Article
# from .serializers import ArticleSerializer
# import logging

# logger = logging.getLogger(__name__)

# class ArticleViewSet(viewsets.ModelViewSet):
#     queryset = Article.objects.all()
#     serializer_class = ArticleSerializer
#     parser_classes = (MultiPartParser, FormParser)
    
#     def get_permissions(self):
#         """
#         Instantiate and return the list of permissions that this view requires.
#         """
#         if self.action in ['create', 'update', 'partial_update', 'destroy']:
#             permission_classes = [permissions.IsAuthenticated]
#         else:
#             permission_classes = [permissions.AllowAny]
#         return [permission() for permission in permission_classes]
    
#     def create(self, request, *args, **kwargs):
#         try:
#             # Log request data for debugging
#             logger.info(f"Request data: {request.data}")
#             logger.info(f"Request FILES: {request.FILES}")
#             logger.info(f"Request user: {request.user}")
            
#             # Create a mutable copy of the data
#             data = request.data.copy()
            
#             # Generate slug from title
#             title = data.get('title', '')
#             slug = slugify(title)
            
#             # Calculate read time (rough estimate: 200 words per minute)
#             content = data.get('content', '')
#             word_count = len(content.split())
#             read_time = f"{max(1, round(word_count / 200))} min read"
            
#             # Add computed fields
#             data['slug'] = slug
#             data['read_time'] = read_time
#             data['status'] = 'pending'
            
#             # Create serializer with modified data
#             serializer = self.get_serializer(data=data)
#             serializer.is_valid(raise_exception=True)
            
#             # Save with author
#             self.perform_create(serializer)
            
#             headers = self.get_success_headers(serializer.data)
#             return Response(
#                 serializer.data, 
#                 status=status.HTTP_201_CREATED, 
#                 headers=headers
#             )
            
#         except Exception as e:
#             logger.error(f"Error creating article: {str(e)}", exc_info=True)
#             return Response(
#                 {'error': str(e)},
#                 status=status.HTTP_400_BAD_REQUEST
#             )
    
#     def perform_create(self, serializer):
#         serializer.save(author=self.request.user)

# from rest_framework import viewsets, permissions, status
# from rest_framework.response import Response
# from rest_framework.decorators import action
# from rest_framework.parsers import MultiPartParser, FormParser
# from django.utils.text import slugify
# from blog.models import Article
# from .serializers import ArticleSerializer

# class ArticleViewSet(viewsets.ModelViewSet):
#     queryset = Article.objects.all()
#     serializer_class = ArticleSerializer
#     parser_classes = (MultiPartParser, FormParser)
    
#     def get_permissions(self):
#         if self.action in ['create', 'update', 'partial_update', 'destroy']:
#             permission_classes = [permissions.IsAuthenticated]
#         else:
#             permission_classes = [permissions.AllowAny]
#         return [permission() for permission in permission_classes]
    
#     def perform_create(self, serializer):
#         print(f"User: {self.request.user}")  # Logs the user making the request
#         print(f"Is Authenticated: {self.request.user.is_authenticated}")  # Verify user is authenticated
#         print(f"Data: {self.request.data}")  # Logs the incoming data
#         # Generate slug from title
#         slug = slugify(self.request.data.get('title'))
#         # Calculate read time (rough estimate: 200 words per minute)
#         content = self.request.data.get('content', '')
#         word_count = len(content.split())
#         read_time = f"{max(1, round(word_count / 200))} min read"
        
#         serializer.save(
#             author=self.request.user,
#             status='pending',
#             slug=slug,
#             read_time=read_time
#         )

#     @action(detail=True, methods=['post'], permission_classes=[permissions.IsAdminUser])
#     def review(self, request, pk=None):
#         article = self.get_object()
#         status = request.data.get('status')
#         if status not in ['published', 'rejected']:
#             return Response(
#                 {'error': 'Invalid status'},
#                 status=status.HTTP_400_BAD_REQUEST
#             )
#         article.status = status
#         article.save()
#         return Response({'status': 'Article reviewed'})