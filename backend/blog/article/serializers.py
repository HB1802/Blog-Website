
from rest_framework import serializers
from blog.models import Article, Comment
from django.contrib.auth.models import User

class ArticleAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class CommentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class CommentSerializer(serializers.ModelSerializer):
    user = CommentUserSerializer(read_only=True)
    
    class Meta:
        model = Comment
        fields = ['id', 'content', 'rating', 'created_at', 'user']
        read_only_fields = ['user']
        
    def validate_rating(self, value):
        if not (1 <= value <= 5):
            raise serializers.ValidationError("Rating must be between 1 and 5")
        return value
        
    def validate_content(self, value):
        if not value.strip():
            raise serializers.ValidationError("Comment content is required")
        return value.strip()

class ArticleSerializer(serializers.ModelSerializer):
    author = ArticleAuthorSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    
    class Meta:
        model = Article
        fields = [
            'id', 'title', 'slug', 'content', 'excerpt',
            'category', 'featured_image', 'status',
            'created_at', 'read_time', 'author', 'comments'
        ]
        read_only_fields = ['slug', 'status', 'author']
        extra_kwargs = {
            'featured_image': {'required': False}
        }
