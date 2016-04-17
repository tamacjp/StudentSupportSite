# -*- coding:utf-8 -*-
# 設定読み込み

try:
    from .local import *
except ImportError:
    from .default import *
