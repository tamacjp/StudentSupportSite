var maketask = function () {
  var $list = $('<div>').addClass('task-list');

  $.each(tasks, function (index, task) {
    var lesson = lessons[task.lesson];

    // 日付表示
    var date = new Date(task.limit);
    $list.append($('<div>').addClass('date').prop('id', formatdate(date))
      .append($('<a>').text(shortdate(date) + ' ' + formattime(date))
        .attr('href', '#calendar=' + formatdate(date))));

    // タスク
    var $row = $('<div>').addClass('');
    $row.append($('<a>').addClass('name').text(lesson.name).attr('href', '#lesson=' + lesson.id));
    if (lesson.select) {
      $row.addClass('select');
    }
    $row.append($('<div>').addClass('task').text(task.task));
    $list.append($row);
  });

  return $list;
};
