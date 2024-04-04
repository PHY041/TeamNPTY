from django.db import models
from django.core.exceptions import ValidationError

# (null=True) allows the database to store a NULL value for the field.
# (blank=True) allows the field to be empty in a form or in the admin interface.

# Event Model.
class Event(models.Model):
    title = models.CharField(max_length=200, blank=False)
    description = models.TextField()
    start_date_time = models.DateTimeField(blank=False)
    end_date_time = models.DateTimeField(blank=False)
    is_online = models.BooleanField(default=False)
    # venue compulsory to fill in if the input is available, but if online, value is null
    venue = models.CharField(max_length=200, null=True, blank=True)
            
    def clean(self):
        super().clean()
        if self.end_date_time <= self.start_date_time:
            raise ValidationError("End date and time must be after start date and time.")
        if (self.end_date_time - self.start_date_time).total_seconds() < 5 * 60:
            raise ValidationError("Event duration must be at least 5 minutes.")
    
    def __str__ (self):
        return self.title
