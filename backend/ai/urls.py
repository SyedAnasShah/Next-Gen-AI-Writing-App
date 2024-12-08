from django.urls import path
from .views import word_analysis
from . import views

urlpatterns = [
    path('check-grammar/', views.check_grammar, name='check_grammar'),
    path('recommend-content/', views.recommend_content, name='recommend_content'),
    path('word-analysis/', word_analysis, name='word_analysis'),
]
