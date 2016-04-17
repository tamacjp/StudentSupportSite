# -*- coding:utf-8 -*-
from django.contrib import admin

from .models import Lesson, Schedule, Task

admin.site.register(Lesson)
admin.site.register(Schedule)
admin.site.register(Task)
