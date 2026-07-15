from django.shortcuts import render, redirect
from django.contrib import messages
from .models import User
from django.contrib.auth.decorators import login_required


def register(request):

    if request.method == 'POST':

        username = request.POST.get('username')
        full_name = request.POST.get("full_name", "").strip()
        email = request.POST.get('email')
        password1 = request.POST.get('password1')
        password2 = request.POST.get('password2')

        # Basic validation
        if not username or not email or not password1 or not password2:
            messages.error(request, "All fields are required.")
            return redirect('register')
        
        parts = full_name.split()

        if len(parts) < 2:
            messages.error(
            request,
         "Please enter your full names!"
        )
            return redirect("register")

        if password1 != password2:
            messages.error(request, "Passwords do not match!")
            return redirect('register')
        
        if len(password1) < 6:
            messages.error(request, "Password too short")
            return redirect("register")

        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already exists!")
            return redirect('register')

        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already exists!")
            return redirect('register')

        # CREATE USER ONLY ONCE (FIXED)
        User.objects.create_user(
            username=username,
            first_name=full_name.split(' ', 1)[0] if full_name else '',
            last_name=full_name.split(' ', 1)[1] if full_name and ' ' in full_name else '',
            email=email,
            password=password1,
            role='student'
        )

        messages.success(request, "Account created successfully")
        return redirect('login')

    return render(request, 'accounts/register.html')


@login_required
def role_redirect(request):
    user = request.user

    if user.role == "student":
        return redirect("student_dashboard")

    if user.role == "officer":
        return redirect("officer_dashboard")

    if user.role == "admin":
        return redirect("admin_dashboard")

    return redirect("dashboard")