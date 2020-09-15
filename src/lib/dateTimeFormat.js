const dateTimeFormat = (date) => {

    function pad2(n) {  // always returns a string
        return (n < 10 ? '0' : '') + n;
      }

    let dt = new Date(date);
    return dt.getFullYear() + "-" +
            pad2(dt.getMonth() + 1) + "-" + 
            pad2(dt.getDate()) + " " +
            pad2(dt.getHours()) + ":" +
            pad2(dt.getMinutes());
            
 }

 export default dateTimeFormat;


/** D-Day 계산(YYYYMMDD - YYYYMMDD) */
export const dDayCount = (date) => {
    let retrunCount = "";
    const today = new Date();
    const gap = toTimeObject(date).getTime()-today.getTime();
    const dday = Math.ceil(gap / (1000 * 60 * 60 * 24)) ;
    /** D-Day가 지난 경우, 0으로 처리 해둠. 로직에 맞게 변경 가능 */
    if(dday === 0){
      retrunCount = "D-Day";
    }else if(dday> 0){
      retrunCount = `D-${dday}`;
    }else{
      retrunCount = "종료";
    }
    return retrunCount;
}
/** Day 계산
 * param: date type
*/
export const dayCount = (date) => {
  const targetDay = new Date(date);
  const today = new Date();
  const gap = today.getTime()-targetDay;
  const dayCount = Math.ceil(gap / (1000 * 60 * 60 * 24));
  return dayCount;
}

/** Time(YYYYMMDD)이 현재시각 이후(미래)인지 체크 */
export const isPassToday = (date) => {
  const today = new Date();
  const gap = Math.ceil( (toTimeObject(date).getTime()-today.getTime()) / (1000 * 60 * 60 * 24));
  return (gap< 0 ? true : false);
}


/** Time 스트링(YYYYMMDD)을 자바스크립트 Date 객체로 변환 */
export const toTimeObject = (time) => {
    var year  = time.substr(0,4);
    var month = time.substr(4,2) - 1; // 1월=0,12월=11
    var day   = time.substr(6,2);
    // console.log(`year: ${year}/ month: ${month}/ day: ${day}`)
    return new Date(year,month,day);
}
/**
 * @param {yyyyMMddhhmm} date
 * @returns {yyyy-MM-dd(day) hh:mm} string 
 */
export const dateTimeBarFormat = (date) => {
  const week = ['일','월','화','수','목','금','토'];

  const year = date.substring(0, 4);
  const month = date.substring(4, 6);
  const day = date.substring(6, 8);
  const hour = date.substring(8,10);
  const minutes = date.substring(10,12);
  const d  = new Date(year+'-'+month+'-'+day);
  const dayLabel = week[d.getDay()];
  
  return date.length > 0 ? year + "-" + month + "-" + day+"("+ dayLabel + ") " + hour +":"+minutes:"";
}
