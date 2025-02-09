# from django.contrib import admin
# from .models import Article

# @admin.register(Article)
# class ArticleAdmin(admin.ModelAdmin):
#     list_display = ('title', 'author', 'status', 'created_at')
#     list_filter = ('status', 'category')
#     search_fields = ('title', 'content')
#     prepopulated_fields = {'slug': ('title',)}


from django.contrib import admin
from .models import Article, Comment

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'status', 'created_at')
    list_filter = ('status', 'category')
    search_fields = ('title', 'content')
    prepopulated_fields = {'slug': ('title',)}

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('article', 'user', 'rating', 'created_at')
    list_filter = ('rating', 'created_at')
    search_fields = ('content', 'user__username', 'article__title')