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

  var $table = $('<table>').addClass('lesson-list');
  for (var index in schedules) {
    (function (data) {
      if (data.lesson == id) {
        var $row = $('<tr>').addClass('row');
        $row.append($('<td>').addClass('date').append($('<a>').text(shortdate(new Date(data.date))).attr('href', '#list=' + data.date)));
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
    })(schedules[index]);
  }
  $area.append($table);
  return $area;
};