var lessons;
var schedules;
var tasks;
var holidays = {
  '2016-04-29': '昭和の日',
  '2016-05-03': '憲法記念日',
  '2016-05-04': 'みどりの日',
  '2016-05-05': 'こどもの日',
  '2016-06-01': '創立記念日',
  '2016-07-18': '海の日',
};

$(function () {
  $.ajax({
    url: 'api/alldata?' + new Date().getTime(),
    success: function (data) {
      lessons = {};
      $.each(data.lesson, function (index, obj) {
        lessons[obj.id] = obj;
      });
      schedules = data.schedule;
      tasks = data.task;
      //holidays = data.holiday;

      // hashチェック
      var currenthash;
      var currentmode;
      setInterval(function () {
        if (currenthash != location.hash) {
          currenthash = location.hash;
          var params = currenthash.slice(1).split('=');
          var mode = params[0] || 'calendar';
          var option = params[1];

          var $content = $('#content');
          switch (mode) {
            case 'calendar':
              // カレンダー表示
              if (currentmode != mode) {
                $content.empty().append(makecalendar());
              }
              scrolldate(option);
              break;

            case 'list':
              // リスト表示
              if (currentmode != mode) {
                $content.empty().append(makelist());
              }
              scrolldate(option);
              break;

            case 'task':
              // タスク
              $content.empty().append(maketask());
              scrolldate(option);
              break;

            case 'lesson':
              // 授業表示
              $content.empty().append(makelesson(option));
              break;
          }
          currentmode = mode;
        }
      }, 100);
    },
  });

  var scrolldate = function (option) {
    // 日付存在チェック
    var target = option || formatdate(new Date());
    $.each(schedules, function (index, obj) {
      var date = obj.date;
      if (date >= target) {
        target = date;
        return false;
      }
    });
    console.log(target);
    var $target = $('#' + target);
    if ($target.length > 0) {
      window.scrollTo(0, $target.offset().top - parseInt($('#content').css('padding-top')));
    }
  };
});

var formatdate = function (date, delim) {
  if (typeof date == 'string') {
    date = new Date(date);
  }
  if (!delim) {
    delim = '-';
  }
  return date.getFullYear() + delim + ('00' + (date.getMonth() + 1)).slice(-2) + delim + ('00' + date.getDate()).slice(-2);
};

var formattime = function (date) {
  if (typeof date == 'string') {
    date = new Date(date);
  }
  return date.getHours() + ':' + ('00' + date.getMinutes()).slice(-2);
};

var shortdate = function (date) {
  if (typeof date == 'string') {
    date = new Date(date);
  }
  return (date.getMonth() + 1) + '月' + date.getDate() + '日(' + '日月火水木金土'[date.getDay()] + ')';
};

var formatperiod = function (data) {
  return (data.length > 1) ? (data.period + '-' + (data.period + data.length - 1)) : data.period;
};
