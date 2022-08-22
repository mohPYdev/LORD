


from django.contrib import admin
from django.urls import include, re_path, path

urlpatterns = [
    re_path('admin/', admin.site.urls),


    re_path(r"^auth/", include('djoser.urls')),
    re_path(r"^auth/", include('djoser.urls.authtoken')),


    re_path('', include('main.urls')),   
]
