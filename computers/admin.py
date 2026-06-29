from django.contrib import admin
from .models import Computer

@admin.register(Computer)
class ComputerAdmin(admin.ModelAdmin):
    list_display = ('name', 'serial_number', 'status')
    list_filter = ('status',)
    search_fields = ('name', 'serial_number')
