import { getCalendarData, deployCalendar } from './utils/create_calendar';
const studyListTable = document.querySelector('#studylistTable');

try {
  if (studyListTable) {
    let classes = getCalendarData(studyListTable);
    deployCalendar(studyListTable, classes);
  }
} catch (e) {
  console.error(e);
}
