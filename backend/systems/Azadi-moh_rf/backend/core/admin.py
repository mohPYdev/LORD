from django.contrib import admin
from .widget import TimePickerInput, DatePickerInput
from durationwidget.widgets import TimeDurationWidget
from django.forms import ModelForm, ValidationError
from datetime import datetime, date
from django import forms

from .models import Item, Reservation, Shift, Service, Category, User
from rest_framework.authtoken.models import TokenProxy as DRFToken


class ItemAdminForm(ModelForm):
     
    number_of_items = forms.IntegerField()

    def save(self, commit=True):
        number_of_items = self.cleaned_data.get('number_of_items', None)
        for i in range(number_of_items - 1):
            Item.objects.create(
                name=self.cleaned_data.get('name')[:-1] + str(i+2),
                category=self.cleaned_data.get('category'),
                description=self.cleaned_data.get('description'),
                image=self.cleaned_data.get('image')            
            )

        return super(ItemAdminForm, self).save(commit=commit)
    
    def clean_name(self):
        name = self.cleaned_data['name']
        name += '1'
        return name


    class Meta:
        model = Item
        fields = '__all__'


class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')
    search_fields = ("name", )
    list_filter = ('category', )

    form = ItemAdminForm


class ShiftAdminForm(ModelForm):

    category = forms.ModelChoiceField(queryset=Category.objects.all())

    class Meta:
        model = Shift
        exclude = ('shift', 'item',)

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


class ShiftAdmin(admin.ModelAdmin):
    form = ShiftAdminForm
    list_display = ('date', 'start_time', 'end_time', 'item')
    list_filter = ('services', 'item')


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