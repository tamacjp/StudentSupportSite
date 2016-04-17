var lessons;
var schedules;
var holidays;

$(function () {
  $.ajax({
    url: '/schedule/api/alldata?' + new Date().getTime(),
    success: function (data) {
      lessons = {};
      for (var index in data.lesson) {
        var obj = data.lesson[index];
        lessons[obj.id] = obj;
      }
      schedules = data.schedule;
      holidays = [];

      // hashチェック
      var currenthash;
      var currentmode;
      setInterval(function () {
        if (currenthash != location.hash) {
          var params = location.hash.slice(1).split('=');
          var mode = params[0] || 'list';
          var option = params[1];

          switch (mode) {
            case 'list':
              // リスト表示
              if (currentmode != mode) {
                $(document.body).empty().append(makelist());
              }
              // 日付存在チェック
              var target = option ? new Date(option) : new Date();
              for (var index in schedules) {
                var date = new Date(schedules[index].date);
                if (date >= target) {
                  option = formatdate(date);
                  break;
                }
              }
              var $target = $('#' + option);
              if ($target.length > 0) {
                window.scrollTo(0, $target.offset().top);
              }
              break;

            case 'calendar':
              // リスト表示
              $(document.body).empty().append(makecalendar());
              break;

            case 'lesson':
              // 授業表示
              $(document.body).empty().append(makelesson(option));
              break;
          }

          // hash修正
          currenthash = location.hash = '#' + [mode, option].join('=');
          currentmode = mode;
        }
      }, 100);
    },
  });
});