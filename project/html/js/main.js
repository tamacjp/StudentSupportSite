var lessons;
var schedules;
var holidays;

$(function () {
  $.ajax({
    url: 'api/alldata?' + new Date().getTime(),
    success: function (data) {
      lessons = {};
      $.each(data.lesson, function (index, obj) {
        lessons[obj.id] = obj;
      });
      schedules = data.schedule;
      holidays = [];

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