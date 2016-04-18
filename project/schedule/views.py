# -*- coding:utf-8 -*-
from __future__ import unicode_literals
from django.http import JsonResponse
from .models import Lesson, Schedule, Task


def endpoint(request):
    # 授業
    lessons = [lesson.toJson() for lesson in Lesson.objects.order_by('weekday', 'period')]

    # スケジュール
    schedules = [schedule.toJson() for schedule in Schedule.objects.order_by('date', 'period')]

    # タスク
    tasks = [task.toJson() for task in Task.objects.order_by('limit')]

    return JsonResponse({
        'lesson': lessons,
        'schedule': schedules,
        'task': tasks,
    })
