from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.admin.views.decorators import staff_member_required
from django.core.mail import send_mail
from django.utils import timezone
from django.db import transaction
from django.db.models import Q

from datetime import datetime

from accounts.models import User
from computers.models import Computer
from .models import Booking


# =========================
# HOME / LANDING
# =========================
def home(request):
    return render(request, "landing.html", {
        "total_users": User.objects.count(),
        "total_computers": Computer.objects.count(),
    })


# =========================
# MY BOOKINGS
# =========================
@login_required
def my_bookings(request):
    bookings = Booking.objects.filter(user=request.user).order_by("-created_at")
    return render(request, "dashboard/my_bookings.html", {"bookings": bookings})


# =========================
# BOOK COMPUTER
# =========================
@login_required
def book_computer(request):

    computers = Computer.objects.filter(status="available")

    if request.method == "POST":

        computer_id = request.POST.get("computer")
        date = request.POST.get("date")
        start_time = request.POST.get("start_time")
        end_time = request.POST.get("end_time")
        purpose = request.POST.get("purpose")

        computer = get_object_or_404(Computer, id=computer_id)

        try:
            start = datetime.strptime(start_time, "%H:%M").time()
            end = datetime.strptime(end_time, "%H:%M").time()
        except ValueError:
            messages.error(request, "Invalid time format")
            return redirect("book_computer")

        if start >= end:
            messages.error(request, "End time must be after start time")
            return redirect("book_computer")

        conflict = Booking.objects.filter(
            computer=computer,
            date=date,
            status__in=["pending", "approved"]
        ).filter(
            Q(start_time__lt=end) &
            Q(end_time__gt=start)
        ).exists()

        if conflict:
            messages.error(request, "Time slot already booked")
            return redirect("book_computer")

        Booking.objects.create(
            user=request.user,
            computer=computer,
            date=date,
            start_time=start,
            end_time=end,
            purpose=purpose,
            status="pending"
        )

        messages.success(request, "Booking submitted successfully")
        return redirect("dashboard")

    return render(request, "dashboard/book.html", {"computers": computers})


# =========================
# APPROVE BOOKING
# =========================
@staff_member_required
def approve_booking(request, booking_id):

    with transaction.atomic():
        booking = get_object_or_404(Booking, id=booking_id)

        if booking.status != "pending":
            return redirect("dashboard")

        computer = Computer.objects.select_for_update().filter(status="available").first()

        if not computer:
            messages.error(request, "No available computers")
            return redirect("dashboard")
        
        from django.core.mail import send_mail



        booking.computer = computer
        booking.status = "approved"
        booking.approved_by = request.user
        booking.approved_at = timezone.now()
        booking.save()
         
        computer.status = "in_use"
        computer.save()
        
        send_mail(
    "Booking Approved",
    f"Your booking for {booking.computer.name} has been approved.",
    None,
    [booking.user.email]
)

        


    return redirect("dashboard")


# =========================
# REJECT BOOKING
# =========================
@staff_member_required
def reject_booking(request, booking_id):

    booking = get_object_or_404(Booking, id=booking_id)

    if booking.status == "pending":
        booking.status = "rejected"
        booking.approved_by = request.user
        booking.approved_at = timezone.now()
        booking.save()
        
    send_mail(
    "Booking Rejected",
    f"Your booking request for {booking.computer.name} has been rejected.",
    None,
    [booking.user.email]
)

    return redirect("dashboard")


# =========================
# CANCEL BOOKING
# =========================
@login_required
def cancel_booking(request, booking_id):

    booking = get_object_or_404(Booking, id=booking_id)

    if booking.user != request.user and request.user.role != "admin":
        messages.error(request, "Not allowed")
        return redirect("my_bookings")

    if booking.status in ["rejected", "cancelled"]:
        messages.error(request, "Booking already closed")
        return redirect("my_bookings")

    booking.status = "cancelled"
    booking.save()

    messages.success(request, "Booking cancelled")
    return redirect("bookings:my_bookings")


# =========================
# EDIT BOOKING (FIXED)
# =========================
@login_required
def edit_booking(request, booking_id):

    booking = get_object_or_404(Booking, id=booking_id)

    if booking.computer is None:
        messages.error(request, "This booking has no computer assigned")
        return redirect("my_bookings")

    if booking.user != request.user and request.user.role != "admin":
        messages.error(request, "Not allowed")
        return redirect("my_bookings")

    if booking.status in ["rejected", "cancelled"]:
        messages.error(request, "Cannot edit this booking")
        return redirect("my_bookings")

    if request.method == "POST":

        date = request.POST.get("date")
        start_time = request.POST.get("start_time")
        end_time = request.POST.get("end_time")

        try:
            start = datetime.strptime(start_time, "%H:%M").time()
            end = datetime.strptime(end_time, "%H:%M").time()
        except ValueError:
            messages.error(request, "Invalid time format")
            return redirect("edit_booking", booking_id=booking.id)

        if start >= end:
            messages.error(request, "End time must be after start time")
            return redirect("edit_booking", booking_id=booking.id)

        conflict = Booking.objects.filter(
            computer=booking.computer,
            date=date,
            status__in=["pending", "approved"]
        ).exclude(id=booking.id).filter(
            Q(start_time__lt=end) &
            Q(end_time__gt=start)
        ).exists()

        if conflict:
            messages.error(request, "Time slot already booked")
            return redirect("edit_booking", booking_id=booking.id)

        booking.date = date
        booking.start_time = start
        booking.end_time = end
        booking.save()

        messages.success(request, "Booking updated successfully")
        return redirect("bookings:my_bookings")

    return render(request, "dashboard/edit_booking.html", {"booking": booking})


# =========================
# CONTACT ICT
# =========================
def contact_ict(request):

    if request.method == "POST":

        name = request.POST.get("name")
        email = request.POST.get("email")
        subject = request.POST.get("subject")
        message = request.POST.get("message")

        send_mail(
            subject=f"ICT Support: {subject}",
            message=f"""
Name: {name}
Email: {email}

Message:
{message}
""",
            from_email=email,
            recipient_list=["ictdepartment@gmail.com"],
        )

        messages.success(request, "Message sent successfully")
        return redirect("contact_ict")

    return render(request, "contact.html")
        
    