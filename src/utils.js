export const getCurrentDate = () => {
  const currentDate = new Date();
  const [minute, hour, day, month, year] = [
    currentDate.getUTCMinutes(),
    currentDate.getUTCHours(),
    currentDate.getUTCDate(),
    currentDate.getUTCMonth()+1,
    currentDate.getUTCFullYear(),
  ];
  return month + '/' + day + '/' + year + ', ' + hour + ':' + (minute < 10 ? ('0' + minute) : minute);
};
