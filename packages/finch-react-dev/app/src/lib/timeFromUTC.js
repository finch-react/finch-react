export default function timeFromUTC(timeInSeconds){
  const DATE = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  let date = new Date(timeInSeconds * 1000);
  return `${date.getDate()} ${DATE[date.getMonth()]} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
}
