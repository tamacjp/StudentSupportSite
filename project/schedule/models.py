# -*- coding:utf-8 -*-
from __future__ import unicode_literals

from django.db import models

WEEKDAYS = (
    (0, '日曜日'),
    (1, '月曜日'),
    (2, '火曜日'),
    (3, '水曜日'),
    (4, '木曜日'),
    (5, '金曜日'),
    (6, '土曜日'),
)
SHORTWEEKDAY = '日月火水木金土'
PERIODS = ((n, n) for n in range(1, 7))


class Lesson(models.Model):
    '''授業科目'''
    name = models.CharField('正式名', max_length=100)
    shortname = models.CharField('短い名前', max_length=10)
    select = models.BooleanField('選択科目')
    weekday = models.IntegerField('曜日', null=True, choices=WEEKDAYS)
    period = models.IntegerField('時限', null=True, choices=PERIODS)
    teacher = models.CharField('担当教員', max_length=200, null=True, blank=True)

    def __unicode__(self):
        return '{} {}'.format(self.schedule(), self.name)

    def schedule(self):
        return '{}{}'.format(SHORTWEEKDAY[self.weekday] if self.weekday is not None else '--',
                             self.period if self.period is not None else '-')


class Schedule(models.Model):
    '''授業予定'''
    date = models.DateField('日付')
    period = models.IntegerField('時限', choices=PERIODS)
    length = models.IntegerField('コマ数', default=1, choices=PERIODS)
    lesson = models.ForeignKey(Lesson, verbose_name='授業', null=True)
    test = models.CharField('試験', max_length=100, null=True, blank=True)
    task = models.CharField('課題', max_length=100, null=True, blank=True)
    teacher = models.CharField('担当教員', max_length=200, null=True, blank=True)
    memo = models.TextField('メモ詳細', null=True, blank=True)


class Task(models.Model):
    '''提出課題'''
    task = models.CharField('課題', max_length=100)
    limit = models.DateTimeField('提出期限')
    lesson = models.ForeignKey(Lesson, verbose_name='授業', null=True)
    teacher = models.CharField('担当教員', max_length=200, null=True, blank=True)
    place = models.CharField('提出場所', max_length=100, null=True, blank=True)
    memo = models.TextField('メモ詳細', null=True, blank=True)
