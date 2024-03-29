from rest_framework import serializers
from core.models import *
from django.contrib.auth import get_user_model

User = get_user_model()





class AttributeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Attribute
        fields = '__all__'
        read_only_fields = ['id',]


class ConfigSerializer(serializers.ModelSerializer):

    logo = serializers.ImageField(required=False)
    home_page_image = serializers.ImageField(required=False)

    class Meta:
        model = Config
        exclude = ('user',)         
        read_only_fields = ['id',]
    


# class ResItemSerializer(serializers.ModelSerializer):
#     """serializer for doctor model"""

#     services = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

#     class Meta:
#         model = ResItem
#         fields = ['id', 'system', 'name','services']
#         read_only_fields = ['id',]


# class ResourceSerializer(ResItemSerializer):
#     """serializer for doctor model"""

#     class Meta(ResItemSerializer.Meta):
#         model = Resource
#         fields = ResItemSerializer.Meta.fields + ['description',]


# class HumanSerializer(ResItemSerializer):
#     """serializer for doctor model"""

#     class Meta(ResItemSerializer.Meta):
#         model = Human
#         fields = ResItemSerializer.Meta.fields + ['description', 'specialty']


# class PlaceSerializer(ResItemSerializer):
#     """serializer for doctor model"""

#     class Meta(ResItemSerializer.Meta):
#         model = Place
#         fields = ResItemSerializer.Meta.fields + ['description', 'kind']


# class TimeSlotSerializer(serializers.ModelSerializer):


#     class Meta:
#         model = TimeSlot
#         fields = ['id','start_time', 'end_time', 'date', 'repeat', 'system']
#         read_only_fields = ['id',]


# class SectionSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Section
#         fields = ['id', 'name', 'system']
#         read_only_fields = ['id',]


# class ServiceSerializer(serializers.ModelSerializer):

#     time_slots = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

#     class Meta:
#         model = Service
#         fields = ['id', 'name', 'duration', 'price', 'time_slots', 'description', 'system']
#         read_only_fields = ['id',]


# class AddTimeSlotSerializer(serializers.ModelSerializer):

#     time_slots = serializers.PrimaryKeyRelatedField(
#         many=True,
#         queryset=TimeSlot.objects.all()
#     )

#     class Meta:
#         model = Service
#         fields = ['id', 'time_slots']


# class AddServiceSerializer(serializers.ModelSerializer):

#     services = serializers.PrimaryKeyRelatedField(
#         many=True,
#         queryset=Service.objects.all()
#     )

#     class Meta:
#         model = Config
#         fields = ['id', 'services']