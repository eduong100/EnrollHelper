export const convertTime12to24 = (timeList) => {
  let [time1, time2, modifier] = [timeList[0], timeList[1], timeList[2]];
  let [hour1, minute1] = time1.split(':');
  let [hour2, minute2] = time2.split(':');

  hour1 = parseInt(hour1, 10);
  hour2 = parseInt(hour2, 10);

  if (hour2 < hour1) {
    hour2 += 12;
  } else {
    if (modifier === 'PM' && hour2 !== 12) {
      hour2 += 12;
      if (hour1 < 12) hour1 += 12;
    }
  }
  hour1 = String(hour1);
  hour2 = String(hour2);
  hour1 = hour1.length < 2 ? '0' + hour1 : hour1;
  hour2 = hour2.length < 2 ? '0' + hour2 : hour2;

  return [`${hour1}:${minute1}:00`, `${hour2}:${minute2}:00`];
};
