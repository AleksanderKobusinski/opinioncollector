from django.urls import path
from base.views import category_views as views

urlpatterns = [
    path('', views.getCategories, name="categories"),
    
    path('create/', views.createCategory, name="category-create"),

    path('<str:pk>/', views.getCategory, name="category"),
    path('update/<str:pk>/', views.updateCategory, name="category-update"),
    path('delete/<str:pk>/', views.deleteCategory, name="category-delete"),
]