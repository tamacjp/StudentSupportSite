# -*- coding:utf-8 -*-
from django.contrib import admin

from .models import Lesson, Schedule, Task


class LessonAdmin(admin.ModelAdmin):
    list_display = ['schedule', 'name', 'teacher']
    list_display_links = ['schedule', 'name']


class ScheduleAdmin(admin.ModelAdmin):
    def lessontitle(self, obj):
        title = obj.lesson.name if obj.lesson else obj.title
        if obj.lesson and obj.lesson.select:
            title += ' *'
        return title

    lessontitle.short_description = '授業'

    list_display = ['date_period', 'lessontitle', 'test', 'task', 'teacher']
    list_display_links = ['lessontitle']
    list_filter = ['lesson']
    search_fields = ['test', 'task', 'teacher']
    date_hierarchy = 'date'
    ordering = ['date', 'period']


class TaskAdmin(admin.ModelAdmin):
    pass


admin.site.register(Lesson, LessonAdmin)
admin.site.register(Schedule, ScheduleAdmin)
admin.site.register(Task, TaskAdmin)
