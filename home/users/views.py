from django.template.loader import get_template
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.views import APIView
from .models import User, ContactForm
from .serializers import UserSerializer


class UserViewSets(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_field = 'username'


class ContactAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, *args, **kwargs):
        contact_name = self.request.data.get('name')
        contact_email = self.request.data.get('from_email')
        contact_subject = self.request.data.get('subject')
        contact_message = self.request.data.get('message')
        to_email = self.request.data.get('to_email')
        template = get_template('../build/contact.txt')
        contact = ContactForm(contact_name=contact_name,
                              contact_email=contact_email,
                              contact_subject=contact_subject,
                              contact_message=contact_message,
                              to_email=to_email)
        context = {
            'contact_name': self.request.data.get('name'),
            'contact_email': self.request.data.get('from_email'),
            'contact_subject': self.request.data.get('subject'),
            'contact_message': self.request.data.get('message'),
            'to_email': self.request.data.get('to_email')
        }
        content = template.render(context)
        return Response(status=HTTP_200_OK)

