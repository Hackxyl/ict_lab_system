from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .models import User
from django.contrib.auth import authenticate, login


def register(request):

    if request.method == "POST":

        username = request.POST.get("username", "").strip()
        full_name = request.POST.get("full_name", "").strip()
        email = request.POST.get("email", "").strip().lower()
        password1 = request.POST.get("password1", "")
        password2 = request.POST.get("password2", "")

        errors = {}

        # ==========================
        # FULL NAME VALIDATION
        # ==========================

        if not full_name:
            errors["full_name"] = "Full name is required."

        else:
            names = full_name.split()

            if len(names) < 2:
                errors["full_name"] = (
                    "Please enter your full names."
                )

        # ==========================
        # USERNAME VALIDATION
        # ==========================

        if not username:
            errors["username"] = "Username is required."

        elif User.objects.filter(username=username).exists():
            errors["username"] = "Username already exists!"

        # ==========================
        # EMAIL VALIDATION
        # ==========================

        if not email:
            errors["email"] = "Email address is required."

        elif User.objects.filter(email=email).exists():
            errors["email"] = "Email address already exists!"

        # ==========================
        # PASSWORD VALIDATION
        # ==========================

        if not password1:
            errors["password1"] = "Password is required."

        elif len(password1) < 6:
            errors["password1"] = (
                "Password too short!"
            )

        if not password2:
            errors["password2"] = "Please confirm your password."

        elif password1 != password2:
            errors["password2"] = "Passwords do not match!"

        # ==========================
        # RETURN ERRORS
        # ==========================

        if errors:

            return render(
                request,
                "accounts/register.html",
                {
                    "errors": errors,
                    "data": request.POST,
                },
            )

        # ==========================
        # CREATE USER
        # ==========================

        first_name = names[0]
        last_name = " ".join(names[1:])

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
            "Account created successfully.."
        )

        return redirect("login")

    return render(request, "accounts/register.html")


def login_view(request):

    print("LOGIN VIEW CALLED")

    errors = {}

    if request.method == "POST":

        username = request.POST.get("username", "").strip()
        password = request.POST.get("password", "")

        if not username:
            errors["username"] = "Username is required."

        if not password:
            errors["password"] = "Password is required."

        if not errors:

            user = authenticate(
                request,
                username=username,
                password=password
            )

            print("Authenticated user:", user)

            if user is None:
                errors["password"] = "Incorrect username or password."

        print("Errors:", errors)

        if errors:
            return render(
                request,
                "accounts/login.html",
                {
                    "errors": errors,
                    "data": request.POST,
                }
            )

        login(request, user)
        return redirect("role_redirect")

    return render(request, "accounts/login.html")


@login_required
def role_redirect(request):

    user = request.user

    if user.role == "student":
        return redirect("student_dashboard")

    elif user.role == "officer":
        return redirect("officer_dashboard")

    elif user.role == "admin":
        return redirect("admin_dashboard")

    return redirect("dashboard")