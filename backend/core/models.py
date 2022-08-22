from datetime import timedelta
from django.db import models


class Config(models.Model):

    UsageType = (
        ('person', 'person'),
        ('place', 'place'),
        ('resource', 'resource'),
    )


    THEMES = (
        ('dark', 'dark'),
        ('light', 'light'),
    )
    
    type = models.CharField(max_length=20, choices=UsageType, default='place')
    has_price= models.BooleanField(default=True)
    has_img_service = models.BooleanField(default=False)
    has_description_service = models.BooleanField(default=False)
    has_description_item = models.BooleanField(default=False)
    has_large_number = models.BooleanField(default=False)
    has_img_item = models.BooleanField(default=False)
    has_email = models.BooleanField(default=False)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    theme = models.CharField(max_length=20, blank=True, choices=THEMES, default='light')
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)

    def __str__(self):
        return self.name + '-' +  self.user.username + '-' + str(self.id)


# class Tag(models.Model):
#     """tags for items"""
#     name = models.CharField(max_length=100)

#     def __str__(self) -> str:
#         return self.name



# class ResItem(models.Model):

#     """
#     Resource item model
#     """
#     system = models.ForeignKey(Config, on_delete=models.CASCADE, null=True)
#     name = models.CharField(max_length=255)
#     services = models.ManyToManyField('Service', blank=True)

#     def __str__(self):
#         return self.name


# class Resource(ResItem):
#     description = models.TextField(blank=True)


# class Human(ResItem):
#     description = models.TextField(blank=True)
#     specialty = models.CharField(max_length=255, blank=True)


# class Place(ResItem):

#     KIND_TYPE = (
#         ('vip', 'vip'),
#         ('normal', 'normal'),
#     )

#     description = models.TextField(blank=True)
#     kind = models.CharField(max_length=50, blank=True, choices=KIND_TYPE, default='normal')


# class Service(models.Model):

#     """
#     Service model
#     """
        
#     system = models.ForeignKey(Config, on_delete=models.CASCADE, null=True)
#     name = models.CharField(max_length=255)
#     duration = models.DurationField(null=True)
#     description = models.TextField(blank=True)
#     price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
#     time_slots = models.ManyToManyField('TimeSlot')

#     def __str__(self):
#         return self.name


# class TimeSlot(models.Model):


#     RepeatType = (
#         ('do not repeat', 'do not repeat'),
#         ('every week', 'every week' ),
#         ('every 2 weeks', 'every 2 weeks' ),
#         ('every month', 'every month' ),
#         ('every 2 months', 'every 2 months' ),
#         ('weekends', 'weekends' ),
#     )
#     system = models.ForeignKey(Config, on_delete=models.CASCADE, null=True)
#     start_time = models.TimeField()
#     end_time = models.TimeField()
#     date = models.DateField()
#     repeat = models.CharField(max_length=50, blank=True, choices=RepeatType, null=True)

    


# class Section(models.Model):
#     system = models.ForeignKey(Config, on_delete=models.CASCADE, null=True)
#     name = models.CharField(max_length=255)

#     def __str__(self):
#         return self.name


