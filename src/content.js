import { getCalendarData, deployCalendar } from './utils/create_calendar';
import { convertTime12to24Tests } from './utils/tests';
const studyListTable = document.querySelector('#studylistTable');

try {
  convertTime12to24Tests();
  if (studyListTable) {
    let classes = getCalendarData(studyListTable);
    deployCalendar(studyListTable, classes);
  }
} catch (e) {
  console.error(e);
}
