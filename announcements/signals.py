from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail

from accounts.models import User
from .models import Announcement


@receiver(post_save, sender=Announcement)
def send_announcement_email(sender, instance, created, **kwargs):

    if not created:
        return

    emails = User.objects.exclude(email="").exclude(email__isnull=True)\
                         .values_list("email", flat=True)

    send_mail(
        subject=f"New Announcement: {instance.title}",
        message=instance.message,
        from_email="ictdepartment@gmail.com",
        recipient_list=list(emails),
        fail_silently=False,
    )