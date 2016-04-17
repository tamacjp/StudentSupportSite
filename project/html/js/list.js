var formatdate = function (date, delim) {
  if (!delim) {
    delim = '-';
  }
  return date.getFullYear() + delim + ('00' + (date.getMonth() + 1)).slice(-2) + delim + ('00' + date.getDate()).slice(-2);
};

var shortdate = function (date) {
  return (date.getMonth() + 1) + '月' + date.getDate() + '日(' + '日月火水木金土'[date.getDay()] + ')';
};

var formatperiod = function (data) {
  return (data.length > 1) ? (data.period + '-' + (data.period + data.length - 1)) : data.period;
};

var makelist = function () {
  var $list = $('<div>').addClass('schedule-list');

  var today;
  for (var index in schedules) {
    (function (data) {
      var lesson = lessons[data.lesson];

      // 日付表示
      if (today != data.date) {
        var date = new Date(data.date);
        if (today && new Date(today).getDay() > date.getDay()) {
          // 週の変わり目
          $list.append($('<hr>'));
        }
        today = data.date;
        $list.append($('<div>').addClass('date').prop('id', today).text(shortdate(date)));
      }

      // 1コマの予定
      var $row = $('<div>').addClass('schedule');
      $row.append($('<div>').addClass('period').text(formatperiod(data)));
      $row.append($('<div>').addClass('name').text(lesson.name).on('click', function () {
        location.hash = 'lesson=' + lesson.id;
      }));
      if (lesson.select) {
        $row.addClass('select');
      }
      if (data.exercises) {
        $row.append($('<div>').addClass('exercises'));
      }
      if (data.test) {
        $row.append($('<div>').addClass('test').text(data.test));
      }
      if (data.task) {
        $row.append($('<div>').addClass('task').text(data.task));
      }
      $list.append($row);
    })(schedules[index]);
  }

  return $list;
};
