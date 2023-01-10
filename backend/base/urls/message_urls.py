from django.urls import path
from base.views import message_views as views

urlpatterns = [
       
    path('', views.getMessages, name="messages"),

    path('create/', views.createMessage, name="message-create"),

    path('<str:pk>/', views.getMessage, name="message"),

    path('delete/<str:pk>/', views.deleteMessage, name="message-delete"),
]