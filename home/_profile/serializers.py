from rest_framework import serializers
from .models import Profile, OtherSkill
from rest_framework import serializers

from .models import Profile, OtherSkill,Layout,Testimonial


class StringSerializer(serializers.StringRelatedField):

    def to_internal_value(self, data):
        return value


class OtherSkillSerializer(serializers.ModelSerializer):

    class Meta:
        model = OtherSkill
        fields = ('id', 'user', 'skills')


class ProfileSerializer(serializers.ModelSerializer):
    user = StringSerializer()
    # profile_pics = serializers.SerializerMethodField()
    # background_image = serializers.SerializerMethodField()
    class Meta:
        model = Profile
        fields = ('id',
                  'user',
                  'profile_pics',
                  'logo',
                  'background_image',
                  'phone_number',
                  'website',
                  'linkedin',
                  'twitter',
                  'instagram',
                  'about',
                  )
class TestimonialSerializer(serializers.ModelSerializer):
    user = StringSerializer()
    class Meta:
        model = Testimonial
        fields =('__all__')

