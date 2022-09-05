import os
import json

from django.shortcuts import HttpResponse

from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from main.serializers import *
from core.models import *
from django.contrib.auth import get_user_model
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from PIL import Image

import shutil

User = get_user_model()


class ConfigViewSet(viewsets.ModelViewSet):
    queryset = Config.objects.all()
    serializer_class = ConfigSerializer
    permission_classes = (IsAuthenticated,)
    parser_classes = (MultiPartParser, JSONParser)


    def perform_create(self, serializer):
        serializer.save(user = self.request.user)

    def get_queryset(self):
        return self.queryset.filter(user= self.request.user)


class AttributeViewSet(viewsets.ModelViewSet):
    queryset = Attribute.objects.all()
    serializer_class = AttributeSerializer
    permission_classes = (IsAuthenticated,)

    @action(detail=False, methods=['get'], url_path = 'get_attributes/(?P<type>\w+)')
    def get_attributes(self, request, type):

        attributes = self.queryset.filter(type=type)

        serializer = AttributeSerializer(attributes, many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    # @action(detail=True, methods=['get'])
    # def get_items(self, request, pk=None):

    #     system = self.get_object()
    #     if system.user == request.user:  
                        
    #         serializer = ResItemSerializer(system.resitem_set.all(), many=True)
    #         return Response(
    #             serializer.data,
    #             status=status.HTTP_200_OK
    #         )


    #     return Response(
    #         {'error':'permission denied!'},
    #         status=status.HTTP_200_OK
    #     )

    # @action(detail=True, methods=['get'])
    # def get_services(self, request, pk=None):

    #     system = self.get_object()
    #     if system.user == request.user:  
                        
    #         serializer = ServiceSerializer(system.service_set.all(), many=True)
    #         return Response(
    #             serializer.data,
    #             status=status.HTTP_200_OK
    #         )


    #     return Response(
    #         {'error':'permission denied!'},
    #         status=status.HTTP_200_OK
    #     )
    # @action(detail=True, methods=['get'])
    # def get_timeslots(self, request, pk=None):

    #     system = self.get_object()
    #     if system.user == request.user:  
                        
    #         serializer = TimeSlotSerializer(system.timeslot_set.all(), many=True)
    #         return Response(
    #             serializer.data,
    #             status=status.HTTP_200_OK
    #         )


    #     return Response(
    #         {'error':'permission denied!'},
    #         status=status.HTTP_200_OK
    #     )


# class ResItemViewSet(viewsets.ModelViewSet):

#     permission_classes = (IsAuthenticated,)

#     def get_serializer_class(self):

#         if self.action == 'add_services':
#             return AddServiceSerializer
#         return self.serializer_class
    
#     def get_queryset(self):
#         return self.queryset.filter(system__user = self.request.user)


#     @action(detail=True, methods=['post'])
#     def add_services(self, request, pk=None):

#         resitem = self.get_object()
#         if resitem.system.user == request.user:    
#             serializer = self.get_serializer(resitem, data=request.data)
            
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(
#                     serializer.data,
#                     status=status.HTTP_200_OK
#                 )

#             return Response(
#                 serializer.errors,
#                 status=status.HTTP_400_BAD_REQUEST
#             )


#         return Response(
#             {'error':'permission denied!'},
#             status=status.HTTP_401_UNAUTHORIZED
#         )


# class HumanViewSet(ResItemViewSet):
#     queryset = Human.objects.all()
#     serializer_class = HumanSerializer


# class PlaceViewSet(ResItemViewSet):
#     queryset = Place.objects.all()
#     serializer_class = PlaceSerializer
    

# class ResourceViewSet(ResItemViewSet):
#     queryset = Resource.objects.all()
#     serializer_class = ResourceSerializer


# class TimeSlotViewSet(viewsets.ModelViewSet):
#     queryset = TimeSlot.objects.all()
#     serializer_class = TimeSlotSerializer
#     permission_classes = (IsAuthenticated,)
   

# class SectionViewSet(viewsets.ModelViewSet):
#     queryset = Section.objects.all()
#     serializer_class = SectionSerializer
#     permission_classes = (IsAuthenticated,)


# class ServiceViewSet(viewsets.ModelViewSet):
#     queryset = Service.objects.all()
#     serializer_class = ServiceSerializer
#     permission_classes = (IsAuthenticated,)

#     def get_serializer_class(self):

#         if self.action == 'add_timeSlot':
#             return AddTimeSlotSerializer
#         return self.serializer_class
    
#     def get_queryset(self):
#         return self.queryset.filter(system__user = self.request.user)


#     @action(detail=True, methods=['post'])
#     def add_timeSlot(self, request, pk=None):
        

#         service = self.get_object()
#         if service.system.user == request.user:       
#             serializer = self.get_serializer(service, data=request.data)
        
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(
#                     serializer.data,
#                     status=status.HTTP_200_OK
#                 )

#             return Response(
#                 serializer.errors,
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#         return Response(
#             {'error': 'permission denied!'},
#             status=status.HTTP_401_UNAUTHORIZED
#         )


class GenerateFilesView(APIView):

    # authentication_classes = [TokenAuthentication,]
    # permission_classes = [IsAuthenticated,]

    def get(self, request, *args, **kwargs):
        
        system = Config.objects.get(id=self.kwargs['pk'])
        s_name = system.name.replace(" ", "")
        path = f'systems/{s_name}-{system.user.username}/'
        hp_path = f'media/homeP/{system.name}/'
        logo_path = f'media/homeP/{system.name}/'

        src = 'templates/'

        # copy files into the created folders
        if os.path.exists(path):
            shutil.rmtree(path)
        shutil.copytree(src, path)



            # backend

        # models.py -> service price
        if not system.has_price:
            content = []
            with open(os.path.join(path + 'backend/core/', 'models.py'), 'r') as f:
                content = f.readlines()
                content[82] = '\n'

            with open(os.path.join(path + 'backend/core/', 'models.py'), 'w') as f:
                f.writelines(content)

            # admin.py
            content = []
            with open(os.path.join(path + 'backend/core/', 'admin.py'), 'r') as f:
                content = f.readlines()
                content[121] = '\n'

            with open(os.path.join(path + 'backend/core/', 'admin.py'), 'w') as f:
                f.writelines(content)


        if not system.has_description_service:
            content = []
            with open(os.path.join(path + 'backend/core/', 'models.py'), 'r') as f:
                content = f.readlines()
                content[83] = '\n'

            with open(os.path.join(path + 'backend/core/', 'models.py'), 'w') as f:
                f.writelines(content)
        
        if not system.has_description_item:
            content = []
            with open(os.path.join(path + 'backend/core/', 'models.py'), 'r') as f:
                content = f.readlines()
                content[38] = '\n'

            with open(os.path.join(path + 'backend/core/', 'models.py'), 'w') as f:
                f.writelines(content)
            
            # admin.py
            content = []
            with open(os.path.join(path + 'backend/core/', 'admin.py'), 'r') as f:
                content = f.readlines()
                content[21] = '\n'

            with open(os.path.join(path + 'backend/core/', 'admin.py'), 'w') as f:
                f.writelines(content)
        
        if not system.has_img_service:
            content = []
            with open(os.path.join(path + 'backend/core/', 'models.py'), 'r') as f:
                content = f.readlines()
                content[84] = '\n'
                content[19] = '\n'
                content[20] = '\n'

            with open(os.path.join(path + 'backend/core/', 'models.py'), 'w') as f:
                f.writelines(content)
        
        if not system.has_img_item:
            content = []
            with open(os.path.join(path + 'backend/core/', 'models.py'), 'r') as f:
                content = f.readlines()
                content[39] = '\n'
                content[14] = '\n'
                content[15] = '\n'
                content[16] = '\n'
                content[17] = '\n'

            with open(os.path.join(path + 'backend/core/', 'models.py'), 'w') as f:
                f.writelines(content)

            # admin.py

            content = []
            with open(os.path.join(path + 'backend/core/', 'admin.py'), 'r') as f:
                content = f.readlines()
                content[22] = '\n'

            with open(os.path.join(path + 'backend/core/', 'admin.py'), 'w') as f:
                f.writelines(content)

        if not system.has_large_number:
            content = []
            with open(os.path.join(path + 'backend/core/', 'admin.py'), 'r') as f:
                content = f.readlines()
                for i in range(11, 36):
                    content[i] = '\n'
                content[43] = '\n'

                for i in range(74, 94):
                    content[i] = '\n'
                
                
                content[54] = '\n'
                content[48] = '\n'


            with open(os.path.join(path + 'backend/core/', 'admin.py'), 'w') as f:
                f.writelines(content)

        if not system.has_email:
            content = []
            with open(os.path.join(path + 'backend/main/', 'views.py'), 'r') as f:
                content = f.readlines()
                content[75] = '\n'

            with open(os.path.join(path + 'backend/main/', 'views.py'), 'w') as f:
                f.writelines(content)


        content = []
        with open(os.path.join(path + 'backend/', 'globals.py'), 'r') as f:
            content = f.readlines()
            s = system.name.replace(" ", "")
            content[0] = f'PROJECT_NAME="{s}"\n'

            if system.has_email:
                content[1] = f'EMAIL="{system.email}"\n'
                content[2] = f'USERNAME="{system.email}"\n'
                content[3] = f'PASSWORD="{system.password}"\n'

        with open(os.path.join(path + 'backend/', 'globals.py'), 'w') as f:
            f.writelines(content)


#######################################################
            # frontend

        # landing js
        content = []
        with open(os.path.join(path + 'frontend/src/pages/landing/', 'Landing.js'), 'r') as f:
            content = f.readlines()
            name_heading = content[12]
            desc_heading = content[18]
            
            name_heading = system.name + '\n'
            desc_heading = system.description + '\n'
            
            content[12] = name_heading
            content[18] = desc_heading

        with open(os.path.join(path + 'frontend/src/pages/landing/', 'Landing.js'), 'w') as f:
            f.writelines(content)
        

        # images
        
        if system.home_page_image:
            hp = os.listdir(hp_path)[0]
            img = Image.open(os.path.join(hp_path, hp))
            img.save(os.path.join(path + 'frontend/src/pages/landing/', f'{hp.split(".")[0]}.jpg'))

        if system.logo:
            logo = os.listdir(logo_path)[0]
            img = Image.open(os.path.join(logo_path, logo))
            img.save(os.path.join(path + 'frontend/public/', f'{logo.split(".")[0]}.jpg'))
            img.save(os.path.join(path + 'frontend/public/', f'{logo.split(".")[0]}.ico'))


        #  navbar
        content = []
        with open(os.path.join(path + 'frontend/src/components/', 'NavBar.js'), 'r') as f:
            content = f.readlines()
            name_heading = content[20]
            
            name_heading = name_heading[:15] + system.name + '\n'
            
            content[20] = name_heading

        with open(os.path.join(path + 'frontend/src/components/', 'NavBar.js'), 'w') as f:
            f.writelines(content)

        
        # ItemCard -> service price
        if not system.has_price:
            content = []
            with open(os.path.join(path + 'frontend/src/components/', 'ItemCard.js'), 'r') as f:
                content = f.readlines()
                # content.pop(18)
                content[19] = '\n'

            with open(os.path.join(path + 'frontend/src/components/', 'ItemCard.js'), 'w') as f:
                f.writelines(content)
        
        # ItemCard -> service description
        if not system.has_description_service:
            content = []
            with open(os.path.join(path + 'frontend/src/components/', 'ItemCard.js'), 'r') as f:
                content = f.readlines()
                # content.pop(19)
                content[20] = '\n'

            with open(os.path.join(path + 'frontend/src/components/', 'ItemCard.js'), 'w') as f:
                f.writelines(content)
        
        # ShowItem => item description 
        if not system.has_description_item:
            content = []
            with open(os.path.join(path + 'frontend/src/components/', 'ShowItem.js'), 'r') as f:
                content = f.readlines()
                content[22] = '\n'

            with open(os.path.join(path + 'frontend/src/components/', 'ShowItem.js'), 'w') as f:
                f.writelines(content)

        # ItemCard -> service image
        if not system.has_img_service:
            content = []
            with open(os.path.join(path + 'frontend/src/components/', 'ItemCard.js'), 'r') as f:
                content = f.readlines()
                # content.pop(16)
                content[17] = '\n'

            with open(os.path.join(path + 'frontend/src/components/', 'ItemCard.js'), 'w') as f:
                f.writelines(content)
        
        # ShowItem -> item image
        if not system.has_img_item:
            content = []
            with open(os.path.join(path + 'frontend/src/components/', 'ShowItem.js'), 'r') as f:
                content = f.readlines()
                # content.pop(19)
                content[19] = "\n"

            with open(os.path.join(path + 'frontend/src/components/', 'ShowItem.js'), 'w') as f:
                f.writelines(content)
        
        # ServiceCard.css -> item and service image css
        if (not system.has_img_item) and (not system.has_img_service):
            content = []
            with open(os.path.join(path + 'frontend/src/components/', 'ServiceCard.css'), 'w') as f:
                f.writelines(content)
        
        if system.theme == 'light':
            content = []
            with open(os.path.join(path + 'frontend/src/', 'index.css'), 'r') as f:
                content = f.readlines()
                content[29] = "\n"
                content[30] = "\n"
                content[31] = "\n"
                content[32] = "\n"
                content[33] = "\n"

            with open(os.path.join(path + 'frontend/src/', 'index.css'), 'w') as f:
                f.writelines(content)


        
        
        # django admin user creation and migration
        os.chdir(f'{path}backend/')

        try:
        #     pass
            os.rename('healthcenter', system.name.replace(" ", ""))
            # os.system('py manage.py makemigrations core')
            # os.system('py manage.py migrate')
            # os.system("py make_admin.py")
        except FileNotFoundError:
            pass
            # os.system('py manage.py makemigrations')
            # os.system('py manage.py migrate')



        os.chdir('../../../')
        zip_file_path = f'systems/{s_name}'
        shutil.make_archive(zip_file_path, 'zip', f'systems/{s_name}-{system.user.username}')
        zip_file = open(f'{zip_file_path}.zip', 'rb')
 

        response = HttpResponse(zip_file, content_type='application/zip')
        response['Content-Disposition'] = f'attachment; filename={system.name}.zip'

        return response

       
        

        
        
        
        # return Response({'message':'working'})
