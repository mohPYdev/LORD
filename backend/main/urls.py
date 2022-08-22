from rest_framework import routers
from django.urls import path

from main.views import *


router = routers.SimpleRouter()

# router.register(r'humans', HumanViewSet)
# router.register(r'places', PlaceViewSet)
# router.register(r'resources', ResourceViewSet)
# router.register(r'time_slots', TimeSlotViewSet)
# router.register(r'sections', SectionViewSet)
router.register(r'systems', ConfigViewSet)
# router.register(r'services', ServiceViewSet)

urlpatterns = router.urls


urlpatterns += [
    path('generate/<int:pk>/', GenerateFilesView.as_view()),
]