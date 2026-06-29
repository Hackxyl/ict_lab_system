from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib import messages
from django.db.models import Q

from .models import Announcement
from .forms import AnnouncementForm


def is_staff(user):
    return user.is_authenticated and (user.is_staff or user.role in ['admin', 'officer'])


@login_required
def announcement_list(request):

    query = request.GET.get('q', '').strip()

    announcements = Announcement.objects.all().order_by('-created_at')

    # SERVER-SIDE SEARCH (still useful for URL search or fallback)
    if query:
        announcements = announcements.filter(
            Q(title__icontains=query) |
            Q(message__icontains=query)
        )

    return render(request, 'dashboard/announcements.html', {
        'announcements': announcements,
        'query': query
    })


@user_passes_test(is_staff)
def create_announcement(request):
    if request.method == 'POST':
        form = AnnouncementForm(request.POST)

        if form.is_valid():
            announcement = form.save(commit=False)
            announcement.created_by = request.user
            announcement.save()

            messages.success(request, "Announcement created successfully.")
            return redirect('announcements')

    else:
        form = AnnouncementForm()

    return render(request, 'create_announcement.html', {
        'form': form
    })