# -*- coding:utf-8 -*-

import os
from django.conf.urls import url, include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^schedule/api/', include('schedule.urls'))
]

if settings.DEBUG:
    urlpatterns += static('/', document_root=os.path.join(settings.PROJECT_ROOT, 'html'))
