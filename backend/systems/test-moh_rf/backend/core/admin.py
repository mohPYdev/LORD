from django.contrib import admin
from .widget import TimePickerInput, DatePickerInput
from durationwidget.widgets import TimeDurationWidget
from django.forms import ModelForm, ValidationError
from datetime import datetime, date
from django import forms

from .models import Item, Reservation, Shift, Service, Category, User
from rest_framework.authtoken.models import TokenProxy as DRFToken





























class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')
    search_fields = ("name", )
    list_filter = ('category', )




class ShiftAdminForm(ModelForm):

    category = forms.ModelChoiceField(queryset=Category.objects.all())

    class Meta:
        model = Shift
        exclude = ('shift',         widgets = {
            'start_time' : TimePickerInput(),
            'end_time' : TimePickerInput(),
            'date': DatePickerInput()
        }
    
    def clean(self):
        services = self.cleaned_data.get('services')
        start_time = self.cleaned_data.get('start_time')
        end_time = self.cleaned_data.get('end_time')
        for service in services:
            difft = datetime.combine(date.today(), end_time) - datetime.combine(date.today(), start_time)
            if difft.seconds < service.duration.seconds:
                raise ValidationError("duration of service is greater than your time slot length")

        return super().clean()

    






















class ShiftAdmin(admin.ModelAdmin):
    form = ShiftAdminForm
    list_display = ('date', 'start_time', 'end_time', 'item', 'get_category')
    list_filter = ('services', 'item')

    def get_category(self, obj):
        return obj.item.category
    get_category.short_description = 'Category'


class ServiceAdminForm(ModelForm):
    class Meta:
        model = Service
        fields = '__all__'

        widgets = {
            'duration' : TimeDurationWidget(show_seconds=False, show_days=False),
        }


class ServiceAdmin(admin.ModelAdmin):
    form = ServiceAdminForm
    list_display= ('name', 'subtitle', 'price', )


class ReservationAdmin(admin.ModelAdmin):
    list_display = ('item', 'reserver',  'time', 'code')
    list_filter = ('item',)


class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'phone_number')


admin.site.register(User, UserAdmin)
admin.site.register(Item, ItemAdmin)
admin.site.register(Reservation, ReservationAdmin)
admin.site.register(Shift, ShiftAdmin)
admin.site.register(Service, ServiceAdmin)
admin.site.register(Category)
admin.site.unregister(DRFToken)