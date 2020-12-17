from allauth.account.adapter import get_adapter
from rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from _profile.models import Profile
from _profile.serializers import ProfileSerializer
# from django.contrib.auth.models import User

from .models import User, user_choices, ContactForm


class StringSerializer(serializers.StringRelatedField):

    def to_internal_value(self, data):
        return value


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    is_staff = serializers.BooleanField()

    class Meta:
        model = User
        fields = ('id',
                  'first_name',
                  'last_name',
                  'email',
                  'is_staff',
                  'username',
                  'password',
                  'profile',)
        extra_kwargs = {
            "password":
                {"write_only": True}
        }

    def create(self, validated_data):
        print(validated_data)
        profile_data = validated_data.pop('profile')
        user_objects = {
            'data': validated_data
        }
        print('users objects', user_objects)
        # user = User.objects.create(**validated_data)
        user = User()
        user.username = validated_data.get('username')
        user.first_name = validated_data.get('first_name')
        user.last_name = validated_data.get('last_name')
        user.email = validated_data.get('email')
        user.set_password(validated_data.get('password'))
        user.save()
        profile_data = {
            'data': profile_data
        }
        print('profile_data', profile_data)
        # i am defining a post save in the profile model for the user
        # Profile.objects.create(user=user, **profile_data)
        return user

    # using it to update the user profile
    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile')
        # Unless the application properly enforces that this field is
        # always set, the following could raise a `DoesNotExist`, which
        # would need to be handled.
        profile = instance.profile
        print('instance profile', instance.profile)
        print('instance user', instance)

        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.save()

        profile.user = instance
        profile.profile_pics = profile_data.get(
            'profile_pics',
            profile.profile_pics
        )
        profile.logo = profile_data.get(
            'logo',
            profile.logo
        )
        profile.background_image = profile_data.get(
            'background_image',
            profile.background_image
        )
        profile.phone_number = profile_data.get(
            'phone_number',
            profile.phone_number
        )
        profile.website = profile_data.get(
            'website',
            profile.website
        )
        profile.linkedin = profile_data.get(
            'linkedin',
            profile.linkedin
        )
        profile.about = profile_data.get(
            'about',
            profile.about
        )
        profile.save()

        return instance


class CustomRegisterSerializer(RegisterSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    first_name = serializers.CharField()
    last_name = serializers.CharField()

    class Meta:
        model = User
        fields = ('first_name',
                  'last_name',
                  'email',
                  'username',
                  'password1',
                  'password2',)

    def get_cleaned_data(self):
        return {
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'email': self.validated_data.get('email', ''),
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user.save()
        adapter.save_user(request, user, self)
        return user


class TokenSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Token
        fields = ('key', 'user',)
