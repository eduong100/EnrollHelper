import { convertTime12to24 } from './convert_time';

export const convertTime12to24Tests = () => {
  let testAM = convertTime12to24(['8:00', '10:00', 'AM']);
  let testPM = convertTime12to24(['1:00', '3:00', 'PM']);
  let testMix = convertTime12to24(['8:40', '3:55', 'PM']);
  let testEdge1 = convertTime12to24(['8:00', '12:00', 'PM']);
  let testEdge2 = convertTime12to24(['8:00', '3:00', 'PM']);

  console.assert(testAM[0] === '08:00:00' && testAM[1] === '10:00:00');
  console.assert(testPM[0] === '13:00:00' && testPM[1] === '15:00:00');
  console.assert(testMix[0] === '08:40:00' && testMix[1] === '15:55:00');
  console.assert(testEdge1[0] === '08:00:00' && testEdge1[1] === '12:00:00');
  console.assert(testEdge2[0] === '08:00:00' && testEdge2[1] === '15:00:00');
};
