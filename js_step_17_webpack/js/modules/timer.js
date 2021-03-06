const getZero = num => {

    num = (num >= 0 && num < 10) ? `0${num}` : num;
    return num;
};

const timer = (selector, deadline) => {

  const getTimeRemaining = endtime => {

    let total = Date.parse(endtime) - Date.parse(new Date());
    let d = Math.floor( (total / (1000 * 60 * 60 * 24)) );
    let h = Math.floor( (total / (1000 * 60 * 60) % 24) ); // общее количество часов делем сколько в одном дне часов
    let m = Math.floor( (total / (1000 * 60) % 60) );
    let s = Math.floor( (total / 1000) % 60);
    
    return {
      'total': total,
      'd': d,
      'h': h,
      'm': m,
      's': s
    };
  };

  const setClock = (selector, endtime) => {
    
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer. querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);
    
    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.textContent = getZero(t.d);
      hours.textContent = getZero(t.h);
      minutes.textContent = getZero(t.m);
      seconds.textContent = getZero(t.s);
      
      if (t.total <= 0) {
        clearInterval(timeInterval);
        days.textContent = getZero(0);
        hours.textContent = getZero(0);
        minutes.textContent = getZero(0);
        seconds.textContent = getZero(0);
      }
    }
    
  };

  setClock(selector, deadline);
  
};

export default timer;
export {getZero};