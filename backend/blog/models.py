# from django.db import models
# from django.contrib.auth.models import User

# class Article(models.Model):
#     STATUS_CHOICES = [
#         ('draft', 'Draft'),
#         ('pending', 'Pending Review'),
#         ('published', 'Published'),
#         ('rejected', 'Rejected'),
#     ]

#     title = models.CharField(max_length=200)
#     slug = models.SlugField(unique=True)
#     content = models.TextField()
#     excerpt = models.TextField()
#     author = models.ForeignKey(User, on_delete=models.CASCADE)
#     category = models.CharField(max_length=50)
#     featured_image = models.ImageField(upload_to='articles/', null=True, blank=True)
#     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
#     read_time = models.CharField(max_length=20)
#     is_featured = models.BooleanField(default=False)

#     class Meta:
#         ordering = ['-created_at']

#     def __str__(self):
#         return self.title

from django.db import models
from django.contrib.auth.models import User

class Article(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('pending', 'Pending Review'),
        ('published', 'Published'),
        ('rejected', 'Rejected'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    content = models.TextField()
    excerpt = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.CharField(max_length=50)
    featured_image = models.ImageField(upload_to='articles/', null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    read_time = models.CharField(max_length=20)
    is_featured = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class Comment(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    rating = models.IntegerField(default=5)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'Comment by {self.user.username} on {self.article.title}'