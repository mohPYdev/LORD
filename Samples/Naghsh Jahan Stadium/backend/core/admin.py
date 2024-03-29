from django.contrib import admin
from .widget import TimePickerInput, DatePickerInput
from durationwidget.widgets import TimeDurationWidget
from django.forms import ModelForm, ValidationError
from datetime import datetime, date
from django import forms
from django.db.models import Q
from django.contrib.auth.admin import UserAdmin
from .models import Item, Reservation, Shift, Service, Category, User, ShiftArchive, ReservationArchive
from rest_framework.authtoken.models import TokenProxy as DRFToken

from .ItemClass import ItemAdminForm




class ItemAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'category'
    )
    search_fields = (
        'name',
     )
    list_filter = ('category', )

    form = ItemAdminForm


class ShiftAdminForm(ModelForm):

    category = forms.ModelChoiceField(queryset=Category.objects.all())

    class Meta:
        model = Shift
        exclude = (
            'shift', 
            'item',
            'is_archive'
           )
        widgets = {
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

    
    def save(self, commit=True):
        instance = super(ShiftAdminForm, self).save(commit=False)
        items = Item.objects.filter(category=self.cleaned_data['category'])
        instance.item = items[0]
        for i in range(1, len(items)):
            s = Shift.objects.create(
                item=items[i],
                start_time = instance.start_time,
                end_time = instance.end_time,
                date = instance.date,
                repeat = instance.repeat,
                n_time_repeat = instance.n_time_repeat,
            )
            
            for service in self.cleaned_data['services']:
                s.services.add(service)

        if commit: 
            instance.save()
        return instance


@admin.action(description='archive')
def make_archive(modeladmin, request, queryset):
    queryset.update(is_archive=True)

class ShiftAdmin(admin.ModelAdmin):
    list_display = ('date', 'start_time', 'end_time', 'item', 'get_category')
    list_filter = ('services', 'item')

    actions = [make_archive]

    def get_form(self, request, obj, **kwargs):
        if obj:
            return super().get_form(request, obj,**kwargs)
        return ShiftAdminForm


    def get_queryset(self, request):
        return super().get_queryset(request).filter(is_archive = False)

    def get_category(self, obj):
        return obj.item.category
    get_category.short_description = 'Category'


class ShiftArchiveAdmin(admin.ModelAdmin):

    list_display = ('date', 'start_time', 'end_time', 'item', 'get_category')
    list_filter = ('services', 'item')

    def get_category(self, obj):
        return obj.item.category
    get_category.short_description = 'Category'

    def get_queryset(self, request):
        return super().get_queryset(request).filter(is_archive=True)

    def has_add_permission(self, request, obj=None):
        return False


class ServiceAdminForm(ModelForm):
    class Meta:
        model = Service
        fields = '__all__'

        widgets = {
            'duration' : TimeDurationWidget(show_seconds=False, show_days=False),
            'subtitle': forms.TextInput(attrs={'placeholder': 'e.g. VIP , Regular, Dentist,'})
        }


class ServiceAdmin(admin.ModelAdmin):
    form = ServiceAdminForm
    list_display= (
        'name',
        'subtitle',
        'price',
        )


class ReservationArchiveAdmin(admin.ModelAdmin):

    list_display = ('item', 'reserver',  'time', 'code', 'status')
    list_filter = ('item',)


    def get_queryset(self, request):
        return super().get_queryset(request).filter(Q(is_archive=True) | Q(status='not accepted'))

    def has_add_permission(self, request, obj=None):
        # cannot add an entity
        return False


class ReservationAdmin(admin.ModelAdmin):
    list_display = ('item', 'reserver',  'time', 'code', 'status')
    list_filter = ('item',)
    actions = [make_archive]

    def get_queryset(self, request):
        return super().get_queryset(request).filter(Q(is_archive=False) & ~Q(status='not accepted'))


class UserAdminCustom(UserAdmin):
    list_display = ('username', 'email', 'phone_number')


admin.site.register(User, UserAdminCustom)
admin.site.register(Reservation, ReservationAdmin)
admin.site.register(Shift, ShiftAdmin)
admin.site.register(ShiftArchive, ShiftArchiveAdmin)
admin.site.register(Service, ServiceAdmin)
admin.site.register(Category)
admin.site.unregister(DRFToken)
admin.site.register(Item, ItemAdmin)






