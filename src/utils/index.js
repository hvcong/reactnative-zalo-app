export function converDate(date) {
  var created_date = new Date(date);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = created_date.getFullYear();
  var month = months[created_date.getMonth()];
  var date = created_date.getDate();
  var hour = created_date.getHours();
  var min = created_date.getMinutes();
  var sec = created_date.getSeconds();
  var time =
    date + "," + month + " " + year + " " + hour + ":" + min + ":" + sec;

  var toString = "" + hour + ":" + (min < 10 ? "0" + min : min);
  return {
    months,
    year,
    month,
    date,
    hour,
    min,
    sec,
    time,
    toString,
  };
}
