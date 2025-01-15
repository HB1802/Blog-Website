from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser
from django.utils.text import slugify
from blog.models import Article
from .serializers import ArticleSerializer

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    parser_classes = (MultiPartParser, FormParser)
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]
    
    def perform_create(self, serializer):
        print(f"User: {self.request.user}")  # Logs the user making the request
        print(f"Is Authenticated: {self.request.user.is_authenticated}")  # Verify user is authenticated
        print(f"Data: {self.request.data}")  # Logs the incoming data
        # Generate slug from title
        slug = slugify(self.request.data.get('title'))
        # Calculate read time (rough estimate: 200 words per minute)
        content = self.request.data.get('content', '')
        word_count = len(content.split())
        read_time = f"{max(1, round(word_count / 200))} min read"
        
        serializer.save(
            author=self.request.user,
            status='pending',
            slug=slug,
            read_time=read_time
        )

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAdminUser])
    def review(self, request, pk=None):
        article = self.get_object()
        status = request.data.get('status')
        if status not in ['published', 'rejected']:
            return Response(
                {'error': 'Invalid status'},
                status=status.HTTP_400_BAD_REQUEST
            )
        article.status = status
        article.save()
        return Response({'status': 'Article reviewed'})