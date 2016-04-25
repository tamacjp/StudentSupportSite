var makecalendar = function () {

  var $calendar = $('<div>').addClass('calendar');

  var date = new Date(schedules[0].date);
  date.setDate(date.getDate() - date.getDay());
  var enddate = new Date(schedules[schedules.length - 1].date);
  enddate.setDate(enddate.getDate() + 7 - enddate.getDay());

  var $row;
  var scheduleindex = 0;
  var taskindex = 0;
  var task = tasks && tasks[taskindex++];
  while (date <= enddate) {
    switch (date.getDay()) {
      case 0: // 日曜日
        $row = $('<div>').addClass('week');
        $calendar.append($row);
        break;
      case 6: // 土曜日
        break;
      default:
        $row.append((function ($day, date) {
          // 日付
          var today = formatdate(date);
          if (holidays[today]) {
            $day.append($('<div>').addClass('date holiday').text(holidays[today]));
          } else {
            var title = shortdate(date);
            if (date.getDay() > 1) {
              title = title.replace(/.+月/, '');
            }
            $day.append($('<div>').addClass('date')
              .append($('<a>').text(title).attr('href', '#list=' + today)));
          }

          // 授業
          for (var period = 1, length; period <= 5; period += length) {
            (function () {
              var $period = $('<div>').addClass('period');
              length = 1;
              var data = schedules[scheduleindex];
              if (data && data.date == today && data.period == period) {
                // この授業を表示
                var lesson = lessons[data.lesson];
                $period.append($('<div>').addClass('title')
                  .append($('<a>').text(lesson.shortname).attr('href', '#lesson=' + data.lesson)));
                if (lesson.select) {
                  $period.addClass('select');
                }
                if (data.exercises) {
                  $period.append($('<div>').addClass('exercises'));
                }
                if (data.test) {
                  $period.append($('<div>').addClass('test').text('試'/*data.test*/));
                }
                if (data.task) {
                  $period.append($('<div>').addClass('task').text('課'/*data.task*/));
                }
                length = data.length;
                scheduleindex++;
              }
              $period.addClass('length' + length);
              $day.append($period);
            })();
          }

          // タスク
          while (task && formatdate(task.limit) <= today) {
            var lesson = lessons[task.lesson];
            var $task = $('<div>').addClass('tasklimit');
            $task.append($('<div>').addClass('limit').text(formattime(task.limit)));
            $task.append($('<a>').addClass('title').text(lesson.shortname).attr('href', '#lesson=' + task.lesson));
            if (lesson.select) {
              $task.addClass('select');
            }
            $day.append($task);
            task = tasks[taskindex++];
          }
          return $day;
        })($('<div>').addClass('day').prop('id', formatdate(date)), date));
        break;
    }
    date.setDate(date.getDate() + 1);
  }

  $(document.body).append($calendar);

  return $calendar;
};
