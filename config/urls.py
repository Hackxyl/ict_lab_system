"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from django.conf import settings
from django.conf.urls.static import static
from accounts.views import role_redirect

from . import views   

urlpatterns = [
    # ADMIN
    path('admin/', admin.site.urls),

    # AUTH
    path('login/', auth_views.LoginView.as_view(template_name='accounts/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(next_page='login'), name='logout'),

    # HOME (LANDING PAGE) ✔ FIX
    path('', views.home, name='home'),
    path("role-redirect/", role_redirect, name="role_redirect"),

    # APPS
    path('dashboard/', include('dashboard.urls')),
    path('accounts/', include('accounts.urls')),
    path('bookings/', include('bookings.urls')),
    path('announcements/', include('announcements.urls')),

    # LANDING PAGES
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('features/', views.features, name='features'),

    # SERVICES
    path('services/network-support/', views.network_support, name='network_support'),
    path('services/system-administration/', views.system_admin, name='system_admin'),
    path('services/ict-training/', views.ict_training, name='ict_training'),
    path('services/helpdesk/', views.helpdesk, name='helpdesk'),
    path('services/computer-packages/', views.computer_packages, name='computer_packages'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)