from django.forms import ModelForm
from django import forms
from .models import Item


class ItemAdminForm(ModelForm):
     
    number_of_items = forms.IntegerField()

    class Meta:
        model = Item
        fields = '__all__'


    def clean_name(self):
        name = self.cleaned_data['name']
        name += '1'
        return name


    def save(self, commit=True):
        number_of_items = self.cleaned_data.get('number_of_items', None)
        for i in range(number_of_items - 1):
            Item.objects.create(
                name=self.cleaned_data.get('name')[:-1] + str(i+2),
                category=self.cleaned_data.get('category'),
                description=self.cleaned_data.get('description'),
                image=self.cleaned_data.get('image'),

            )

        return super(ItemAdminForm, self).save(commit=commit)
    
