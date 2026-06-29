from django.contrib import admin
from django.utils import timezone

from .models import Booking
from computers.models import Computer


# -----------------------------
# Admin Action: Approve Bookings
# -----------------------------
@admin.action(description="Approve selected bookings")
def approve_selected(modeladmin, request, queryset):

    for booking in queryset:

        if booking.status != 'pending':
            continue

        computer = Computer.objects.filter(status='available').first()

        if not computer:
            continue

        booking.computer = computer
        booking.status = 'approved'
        booking.approved_by = request.user
        booking.approved_at = timezone.now()
        booking.save()

        computer.status = 'in_use'
        computer.save()


# -----------------------------
# Admin Action: Reject Bookings
# -----------------------------
@admin.action(description="Reject selected bookings")
def reject_selected(modeladmin, request, queryset):

    for booking in queryset:

        if booking.status == 'pending':
            booking.status = 'rejected'
            booking.approved_by = request.user
            booking.approved_at = timezone.now()
            booking.save()


# -----------------------------
# Booking Admin Panel
# -----------------------------
@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):

    list_display = (
        'user',
        'computer',
        'date',
        'start_time',
        'end_time',
        'status'
    )

    list_filter = ('status', 'date')
    search_fields = ('user__username', 'computer__name')

    actions = [approve_selected, reject_selected]
