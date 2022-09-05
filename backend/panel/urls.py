


from django.contrib import admin
from django.urls import include, re_path, path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    re_path('admin/', admin.site.urls),


    re_path(r"^auth/", include('djoser.urls')),
    re_path(r"^auth/", include('djoser.urls.authtoken')),


    re_path('', include('main.urls')),   
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
