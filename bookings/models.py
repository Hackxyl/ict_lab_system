from django.db import models
from django.core.exceptions import ValidationError

from accounts.models import User
from computers.models import Computer


class Booking(models.Model):

    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('cancelled', 'Cancelled'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    computer = models.ForeignKey(
        Computer,
        on_delete=models.PROTECT,
        related_name='bookings'
    )

    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

    purpose = models.CharField(max_length=255, blank=True)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )

    approved_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name='approved_bookings'
    )

    approved_at = models.DateTimeField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def clean(self):

        # time validation
        if self.start_time >= self.end_time:
            raise ValidationError("End time must be later than start time.")

        # overlap validation
        overlapping = Booking.objects.filter(
            computer=self.computer,
            date=self.date,
            status__in=['pending', 'approved']
        ).exclude(id=self.id)

        for b in overlapping:
            if (
                self.start_time < b.end_time and
                self.end_time > b.start_time
            ):
                raise ValidationError(
                    "This computer is already booked in this time range."
                )

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} - {self.date} ({self.status})"

    def can_edit(self, user):
        if self.status in ['rejected', 'cancelled']:
            return False

        if self.status == 'approved' and user.role != 'admin':
            return False

        return True
