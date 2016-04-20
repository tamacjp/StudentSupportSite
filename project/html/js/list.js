var makelist = function (taskonly) {
  var $list = $('<div>').addClass('schedule-list');

  var scheduleindex = 0;
  var schedule = schedules && schedules[scheduleindex++];
  var taskindex = 0;
  var task = tasks && tasks[taskindex++];
  var date = new Date(Math.min(
    (schedule && schedule.date) ? new Date(schedule.date) : new Date(),
    (task && task.limit) ? new Date(task.limit) : new Date()));
  var prev;

  while (schedule || task) {
    var $day = $('<div>');
    var today = formatdate(date);

    // 授業
    while (schedule && formatdate(schedule.date) == today) {
      if (!taskonly || schedule.task) {
        var lesson = lessons[schedule.lesson];
        var $row = $('<div>').addClass('schedule');
        $row.append($('<div>').addClass('period').text(formatperiod(schedule)));
        $row.append($('<a>').addClass('name').text(lesson.name).attr('href', '#lesson=' + lesson.id));
        if (lesson.select) {
          $row.addClass('select');
        }
        if (schedule.exercises) {
          $row.append($('<div>').addClass('exercises'));
        }
        if (schedule.test) {
          $row.append($('<div>').addClass('test').text(schedule.test));
        }
        if (schedule.task) {
          $row.append($('<div>').addClass('task').text(schedule.task));
        }
        $day.append($row);
      }
      schedule = schedules[scheduleindex++];
    }

    // タスク
    while (task && formatdate(task.limit) == today) {
      var lesson = lessons[task.lesson];
      var $row = $('<div>').addClass('schedule');
      $row.append($('<div>').addClass('limit').text(formattime(task.limit)));
      $row.append($('<a>').addClass('name').text(lesson.name).attr('href', '#lesson=' + lesson.id));
      $row.append($('<div>').addClass('task').text(task.task));
      task = tasks[taskindex++];
      $day.append($row);
    }

    if ($day.children().length) {
      if (prev && date.getDay() > prev.getDay()) {
        // 週の変わり目
        $list.append($('<hr>'));
      }
      $day.prepend($('<div>').addClass('date').prop('id', today)
        .append($('<a>').text(shortdate(date)).attr('href', '#calendar=' + today)));
      $list.append($day);
    }

    date.setDate(date.getDate() + 1);
  }

  return $list;
};
