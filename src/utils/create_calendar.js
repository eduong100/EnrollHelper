import { DayPilot } from '@daypilot/daypilot-lite-javascript';
import { convertTime12to24 } from './convert_time';

export const getCalendarData = (studyListTable) => {
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
  return classes;
};

export const deployCalendar = (studyListTable, classes) => {
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
};
