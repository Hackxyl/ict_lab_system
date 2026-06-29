from django.urls import path
from . import views

app_name = "bookings"

urlpatterns = [
    # USER HOME (booking system dashboard if needed)
    path('home/', views.home, name='home'),

    # BOOKINGS
    path('book/', views.book_computer, name='book_computer'),
    path('my-bookings/', views.my_bookings, name='my_bookings'),

    # BOOKING ACTIONS
    path('edit/<int:booking_id>/', views.edit_booking, name='edit_booking'),
    path('cancel/<int:booking_id>/', views.cancel_booking, name='cancel_booking'),

    # ADMIN ACTIONS
    path('approve/<int:booking_id>/', views.approve_booking, name='approve_booking'),
    path('reject/<int:booking_id>/', views.reject_booking, name='reject_booking'),
]
