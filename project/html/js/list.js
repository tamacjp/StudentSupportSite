var makelist = function () {
  var $list = $('<div>').addClass('schedule-list');

  var today;
  $.each(schedules, function (index, data) {
    var lesson = lessons[data.lesson];

    // 日付表示
    if (today != data.date) {
      var date = new Date(data.date);
      if (today && new Date(today).getDay() > date.getDay()) {
        // 週の変わり目
        $list.append($('<hr>'));
      }
      $list.append($('<div>').addClass('date').prop('id', data.date)
        .append($('<a>').text(shortdate(date)).attr('href', '#calendar=' + data.date)));
      today = data.date;
    }

    // 1コマの予定
    var $row = $('<div>').addClass('schedule');
    $row.append($('<div>').addClass('period').text(formatperiod(data)));
    $row.append($('<a>').addClass('name').text(lesson.name).attr('href', '#lesson=' + lesson.id));
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
  });

  return $list;
};
