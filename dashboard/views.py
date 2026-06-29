from django.shortcuts import render
from django.contrib.auth.decorators import login_required

from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

from accounts.models import User
from computers.models import Computer
from bookings.models import Booking

from config.views import booking_trend, user_month_trend

@login_required
def student_dashboard(request):

  context = {
    "total_my_bookings":
        Booking.objects.filter(user=request.user).count(),

    "pending":
        Booking.objects.filter(
            user=request.user,
            status="pending"
        ).count(),

    "approved":
        Booking.objects.filter(
            user=request.user,
            status="approved"
        ).count(),

    "available_computers":
        Computer.objects.filter(
            status="available"
        ).count(),

    "my_bookings":
        Booking.objects.filter(
            user=request.user
        ).order_by("-created_at")[:5],
}

  return render(
    request,
    "dashboard/student_dashboard.html",
    context
)

@login_required
def officer_dashboard(request):


 context = {
    "pending_bookings":
        Booking.objects.filter(
            status="pending"
        ).count(),

    "approved_bookings":
        Booking.objects.filter(
            status="approved"
        ).count(),

    "rejected_bookings":
        Booking.objects.filter(
            status="rejected"
        ).count(),

    "recent_bookings":
        Booking.objects.select_related(
            "user",
            "computer"
        ).order_by("-created_at")[:10],
}

 return render(
    request,
    "dashboard/officer_dashboard.html",
    context
)

@login_required
def admin_dashboard(request):

 context = {
    "total_users":
        User.objects.count(),

    "total_computers":
        Computer.objects.count(),

    "pending_bookings":
        Booking.objects.filter(
            status="pending"
        ).count(),

    "approved_bookings":
        Booking.objects.filter(
            status="approved"
        ).count(),

    "user_trend":
        user_month_trend(),

    "booking_trend":
        booking_trend(),
}

 return render(
    request,
    "dashboard/admin_dashboard.html",
    context
)


@login_required
def dashboard(request):


 if request.user.role == "admin":
    return redirect("admin_dashboard")

 elif request.user.role == "officer":
    return redirect("officer_dashboard")

 return redirect("student_dashboard")
 


