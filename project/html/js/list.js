var makelist = function () {
  var $list = $('<div>').addClass('schedule-list');

  var today;
  var makedate = function (date) {
    return $('<div>').addClass('date').prop('id', date)
      .append($('<a>').text(shortdate(date)).attr('href', '#calendar=' + date));
  };
  var adddate = function (date) {
    date = formatdate(date);
    if (today != date) {
      if (today && new Date(today).getDay() > new Date(date).getDay()) {
        // 週の変わり目
        $list.append($('<hr>'));
      }
      $list.append(makedate(date));
      today = date;
    }
  };

  var maketask = function (task) {
    var lesson = lessons[task.lesson];
    var $row = $('<div>').addClass('schedule');
    $row.append($('<div>').addClass('limit').text(formattime(task.limit)));
    $row.append($('<a>').addClass('name').text(lesson.name).attr('href', '#lesson=' + lesson.id));
    $row.append($('<div>').addClass('task').text(task.task));
    return $row;
  };
  var addtask = function (task) {
    $list.append(maketask(task));
  };

  var makeperiod = function (data) {
    var lesson = lessons[data.lesson];
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
    return $row;
  };
  var addperiod = function (data) {
    $list.append(makeperiod(data));
  };

  var taskindex = 0;
  var task = tasks && tasks[taskindex++];
  $.each(schedules, function (index, data) {
    while (task && task.limit < data.date) {
      adddate(task.limit);
      addtask(task);
      task = tasks[taskindex++];
    }

    // 日付表示
    adddate(data.date);

    // 1コマの予定
    addperiod(data);
  });

  // 残ったタスクどうしよう（とりあえず表示）
  while (task) {
    adddate(task.limit);
    addtask(task);
    task = tasks[taskindex++];
  }

  return $list;
};
