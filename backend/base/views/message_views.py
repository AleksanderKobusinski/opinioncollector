from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import Message
from base.serializers import MessageSerializer

from rest_framework import status


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getMessages(request):
    messages = Message.objects.all()
    serializer = MessageSerializer(messages, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getMessage(request, pk):
    message = Message.objects.get(_id=pk)
    serializer = MessageSerializer(message, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def createMessage(request):
    data = request.data

    message = Message.objects.create(
        product=data['product'],
        text=data['text'],
    )

    serializer = MessageSerializer(message, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteMessage(request, pk):
    message = Message.objects.get(_id=pk)
    message.delete()
    return Response('Producted Deleted')