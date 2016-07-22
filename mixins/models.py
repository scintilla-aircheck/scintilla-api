from django.db import models


class DateCreatedMixin(models.Model):
    """ Adds tracking for the times when an object was created """

    date_created = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    class Meta:
        abstract = True


class DateUpdatedMixin(models.Model):
    """ Adds tracking for the times when an object was last updated """

    date_updated = models.DateTimeField(auto_now=True, null=True, blank=True)

    class Meta:
        abstract = True


class DateMixin(DateCreatedMixin, DateUpdatedMixin):
    """ Adds tracking for the times when an object was created and last updated """

    class Meta:
        abstract = True
        ordering = ['-date_created']
