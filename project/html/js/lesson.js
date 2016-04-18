var makelesson = function (id) {
  var $area = $('<div>').addClass('lesson');
  var lesson = lessons[id];
  if (!lesson) {
    location.back();
    return $area;
  }

  var $title = $('<div>').addClass('title').text(lesson.name);
  if (lesson.select) {
    $title.addClass('select');
  }
  $area.append($title);

  var addtask = function (task) {
    if (task.lesson == id) {
      var $row = $('<tr>').addClass('row');
      $row.append($('<td>').addClass('date')
        .append($('<a>').text(shortdate(task.limit)).attr('href', '#list=' + formatdate(task.limit))));
      $row.append($('<td>').addClass('limit').text(formattime(task.limit)));
      $row.append($('<td>').addClass('teacher').text(task.teacher));
      var $option = $('<td>').addClass('option');
      $option.append($('<div>').addClass('task').text(task.task));
      if (task.memo) {
        $option.append($('<div>').addClass('memo').text('メモ').on('click', function () {
          alert(task.memo);
        }));
      }
      $row.append($option);
      $table.append($row);
    }
  };

  var taskindex = 0;
  var task = tasks && tasks[taskindex++];
  var $table = $('<table>').addClass('lesson-list');
  $.each(schedules, function (index, data) {
    if (data.lesson == id) {
      while (task && task.limit < data.date) {
        addtask(task);
        task = tasks[taskindex++];
      }

      var $row = $('<tr>').addClass('row');
      $row.append($('<td>').addClass('date').append($('<a>').text(shortdate(data.date)).attr('href', '#list=' + data.date)));
      $row.append($('<td>').addClass('period').text(formatperiod(data)));
      $row.append($('<td>').addClass('teacher').text(data.teacher));
      var $option = $('<td>').addClass('option');
      if (data.exercises) {
        $option.append($('<div>').addClass('exercises'));
      }
      if (data.test) {
        $option.append($('<div>').addClass('test').text(data.test));
      }
      if (data.task) {
        $option.append($('<div>').addClass('task').text(data.task));
      }
      if (data.memo) {
        $option.append($('<div>').addClass('memo').text('メモ').on('click', function () {
          alert(data.memo);
        }));
      }
      $row.append($option);
      $table.append($row);
    }
  });

  while (task) {
    addtask(task);
    task = tasks[taskindex++];
  }

  $area.append($table);
  return $area;
};