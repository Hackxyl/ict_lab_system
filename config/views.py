from django.shortcuts import render
from django.utils import timezone
from datetime import timedelta

from accounts.models import User
from bookings.models import Booking
from computers.models import Computer


# =========================
# ANALYTICS (REUSABLE LOGIC)
# =========================

def user_month_trend():
    today = timezone.now()

    current_users = User.objects.filter(
        date_joined__year=today.year,
        date_joined__month=today.month
    ).count()

    first_day = today.replace(day=1)
    previous_month = first_day - timedelta(days=1)

    previous_users = User.objects.filter(
        date_joined__year=previous_month.year,
        date_joined__month=previous_month.month
    ).count()

    if previous_users == 0:
        return 100 if current_users > 0 else 0

    return round(((current_users - previous_users) / previous_users) * 100, 1)


def booking_trend():
    today = timezone.now().date()
    yesterday = today - timedelta(days=1)

    today_count = Booking.objects.filter(date=today).count()
    yesterday_count = Booking.objects.filter(date=yesterday).count()

    if yesterday_count == 0:
        return 100 if today_count > 0 else 0

    return round(((today_count - yesterday_count) / yesterday_count) * 100, 1)


# =========================
# LANDING PAGE
# =========================

def home(request):
    context = {
        "total_users": User.objects.count(),
        "total_computers": Computer.objects.count(),
        "total_bookings": Booking.objects.count(),
        "available_computers": Computer.objects.filter(status="available").count(),

        "user_trend": user_month_trend(),
        "booking_trend": booking_trend(),
    }
    return render(request, "landing.html", context)


# =========================
# STATIC PAGES
# =========================

def about(request):
    return render(request, "about.html")


def contact(request):
    return render(request, "contact.html")


def features(request):
    return render(request, "features.html")


# =========================
# SERVICES PAGES
# =========================

def network_support(request):
    return render(request, "services/network_support.html")


def system_admin(request):
    return render(request, "services/system_admin.html")


def ict_training(request):
    return render(request, "services/ict_training.html")


def helpdesk(request):
    return render(request, "services/helpdesk.html")


def computer_packages(request):
    return render(request, "services/computer_packages.html")