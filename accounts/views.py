from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .models import User


def register(request):

    if request.method == "POST":

        username = request.POST.get("username", "").strip()
        full_name = request.POST.get("full_name", "").strip()
        email = request.POST.get("email", "").strip().lower()
        password1 = request.POST.get("password1")
        password2 = request.POST.get("password2")

        # ===============================
        # BASIC VALIDATION
        # ===============================

        if not username or not full_name or not email or not password1 or not password2:
            messages.error(request, "All fields are required.")
            return redirect("register")

        # Full name validation
        names = full_name.split()

        if len(names) < 2:
            messages.error(
                request,
                "Please enter your two names!"
            )
            return redirect("register")

        # Passwords match
        if password1 != password2:
            messages.error(request, "Passwords do not match.")
            return redirect("register")

        # Password length
        if len(password1) < 6:
            messages.error(
                request,
                "Password must contain at least 6 characters."
            )
            return redirect("register")

        # Username exists
        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already exists.")
            return redirect("register")

        # Email exists
        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already exists.")
            return redirect("register")

        # Split full name
        first_name = names[0]
        last_name = " ".join(names[1:])

        # Create user
        User.objects.create_user(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password1,
            role="student",
        )

        messages.success(
            request,
            "Account created successfully."
        )

        return redirect("login")

    return render(request, "accounts/register.html")


@login_required
def role_redirect(request):

    if request.user.role == "student":
        return redirect("student_dashboard")

    if request.user.role == "officer":
        return redirect("officer_dashboard")

    if request.user.role == "admin":
        return redirect("admin_dashboard")

    return redirect("dashboard")