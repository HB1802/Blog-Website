from rest_framework import serializers
from blog.models import Article
from django.contrib.auth.models import User

class ArticleAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class ArticleSerializer(serializers.ModelSerializer):
    author = ArticleAuthorSerializer(read_only=True)
    
    class Meta:
        model = Article
        fields = [
            'id', 'title', 'slug', 'content', 'excerpt',
            'category', 'featured_image', 'status',
            'created_at', 'read_time', 'author'
        ]
        read_only_fields = ['slug', 'status', 'author']