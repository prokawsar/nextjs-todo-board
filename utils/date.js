export function dateDiff(expired_day) {
  const date1 = new Date();
  const date2 = new Date(expired_day);

  const timeDiff = date2.getTime() - date1.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}
export function niceDate(date, long = true, time = false) {
  const config = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (long) {
    config.weekday = "long";
  }
  return (
    new Date(date).toLocaleDateString("en-US", config) +
    (time ? " " + new Date(date).toLocaleTimeString() : "")
  );
}
