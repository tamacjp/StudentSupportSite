学生サポートサイト
==================

## What's this? - なんぞ？

* 某大学某学部の学生をサポートするサイト（のソース）です。

## Features - サイト機能

週末にちょろっと作っただけで仕事としてやっているわけではないので必要最低限の機能に絞り込んでいます。

* いまのところ1パターンの時間割と課題の表示だけが可能です。
    * 某学部は学年ごとに時間割が決まっていて基本的にみんな同じ授業を履修しています。
    * なので個人ごとに時間割を作る必要がありません。課題もみんな一様に課されています。
    * 一応選択授業はありますが「取るか／取らないか」なのでこれはグレーで表示することにしました。
* イマドキの学生がアクセスするのでiPhoneで機嫌よく見えるWebサイトがゴールです。
    * ただしセンスはないので配色とかアレなのはアレ。
* アクセスするユーザを識別する必要がないのでユーザ管理はありません。
    * アクセスするだけ、ログイン不要。わかりやすい！
    * 必要に応じてApache側で401認証をかけることで第三者のアクセスを防止します。
* データの登録と更新はDjango adminサイト任せです。
    * 作りこむのめんどくさかっｔ

わざわざGitHubにうｐして汚いソースを晒したのは[ブログ](http://www.subthread.co.jp/blog/20160425/)のネタにするためです。

## How to - え、動かしてみたいの!?

そんな奇特な方がいるかどうかはわかりませんが後日自分でセットアップするときのために。

1. `git clone git@github.com:tamacjp/StudentSupportSite.git`
2. `cd sss ; virtualenv venv`
3. `./venv/bin/pip install Django pytz`
4. `cd project ; ./manage.py makemigrations ; ./manage.py migrate`
5. `./manage.py createsuperuser`
6. `./manage.py runserver 0.0.0.0:8000`

必要に応じて _project/sss/settings/local.sample.py_ を _project/sss/settings/local.py_ にコピーしてローカル固有の設定やパス調整を記述。

http://localhost:8000/admin/ で授業科目（Lesson）と時間割（Schedule）、あれば課題（Task）を登録して
http://localhost:8000/index.html でサイト表示できます。
