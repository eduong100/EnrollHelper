import { DayPilot } from '@daypilot/daypilot-lite-javascript';

const studyListTable = document.querySelector('#studylistTable');

const convertTime12to24 = (timeList) => {
  let [time1, time2, modifier] = [timeList[0], timeList[1], timeList[2]];
  let [hour1, minute1] = time1.split(':');
  let [hour2, minute2] = time2.split(':');

  hour1 = parseInt(hour1, 10);
  hour2 = parseInt(hour2, 10);

  if (hour2 < hour1) {
    hour2 += 12;
  } else {
    if (modifier === 'PM') {
      if (hour2 < 12) hour2 += 12;
      if (hour1 < 12) hour1 += 12;
    }
  }
  hour1 = String(hour1);
  hour2 = String(hour2);
  hour1 = hour1.length < 2 ? '0' + hour1 : hour1;
  hour2 = hour2.length < 2 ? '0' + hour2 : hour2;

  return [`${hour1}:${minute1}:00`, `${hour2}:${minute2}:00`];
};

if (studyListTable) {
  let classes = [];
  let rows = studyListTable.children[0].children;
  for (let i = 3; i < rows.length - 1; i++) {
    let row = rows[i];

    let nameText =
      row.children[1].textContent + ' ' + row.children[2].textContent;
    let sectionText =
      row.children[4].textContent + ' ' + row.children[5].textContent;
    let daysElememnt = row.children[8];
    let timeElement = row.children[9];
    let daysList = daysElememnt
      .querySelector('td')
      .textContent.trim()
      .split(/\s+/);

    let timeList = timeElement
      .querySelector('td')
      .textContent.trim()
      .split(/\s+/);
    if (timeList[1][timeList[1].length - 1] === 'p') {
      timeList.push('PM');
    } else {
      timeList.push('AM');
    }
    timeList[0] = timeList[0].slice(0, -1);
    timeList[1] = timeList[1].slice(0, -1);
    timeList = convertTime12to24(timeList);
    classes.push({ nameText, sectionText, daysList, timeList });
  }

  let calendarElement = document.createElement('div');
  calendarElement.setAttribute('id', 'calendar');

  studyListTable.after(calendarElement);

  const calendar = new DayPilot.Calendar('calendar', {
    viewType: 'WorkWeek',
    startDate: '2022-03-21',
    headerDateFormat: 'dddd',
  });

  let dateMap = {
    Mo: '2022-03-21T',
    Tu: '2022-03-22T',
    We: '2022-03-23T',
    Th: '2022-03-24T',
    Fr: '2022-03-25T',
  };
  let events = [];
  let [earliestTime, latestTime] = [24, 0];
  for (let curClass of classes) {
    for (let curDay of curClass['daysList']) {
      const timeStart = curClass['timeList'][0];
      const timeEnd = curClass['timeList'][1];
      earliestTime = Math.min(earliestTime, parseInt(timeStart, 10));
      latestTime = Math.max(latestTime, parseInt(timeEnd, 10));
      events.push({
        start: dateMap[curDay] + timeStart,
        end: dateMap[curDay] + timeEnd,
        text: curClass['nameText'] + '\n' + curClass['sectionText'],
        moveDisabled: true,
      });
    }
  }
  calendar.businessBeginsHour = earliestTime;
  calendar.businessEndsHour = latestTime + 1;
  calendar.init();
  calendar.update({ events });
}
