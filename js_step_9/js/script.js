document.addEventListener("DOMContentLoaded", () => {
  // ТАБЫ
  const tabContents = document.querySelectorAll('.tabcontent'),
        tabheaderItems = document.querySelectorAll('.tabheader__item'),
        tabheaderItemsBlock = document.querySelector('.tabheader__items');

  // Скрывать табы и items
  const hideTabContent = () => {
    tabContents.forEach( item => item.style.display = 'none' );
    tabheaderItems.forEach( item => item.classList.remove('tabheader__item_active') );
  };
  // Показывать табы и items
  const showTabContent = (i) => {
    tabContents[i].style.display = '';
    tabheaderItems[i].classList.add('tabheader__item_active');
  };

  hideTabContent();
  showTabContent(0);
        
  
  tabheaderItemsBlock.addEventListener('click', event => {

      const target = event.target;
      
      if (target && target.classList.contains('tabheader__item')) {
        tabheaderItems.forEach((item, i) => {
          if (item == target) {
            hideTabContent();
            showTabContent(i);
          } 
        });
      }
    });
  
  // ТАЙМЕР
  
  const deadline = '2021-05-20';

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

  const getZero = num => {

    num = (num >= 0 && num < 10) ? `0${num}` : num;
    return num;
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

  setClock('.timer', deadline);

  // МОДАЛ

  const modalBtns = document.querySelectorAll('[data-modal]'),
        modalClose = document.querySelector('[data-close]'),
        modal = document.querySelector('.modal');

  
  const closeModal = () => {
    modal.classList.toggle('show');
    document.body.style.overflow = '';
    clearTimeout(modalTimeId);
  };

  const openModal = () => {
    modal.classList.toggle('show');
    document.body.style.overflow = 'hidden';
  };

  const showModalByScroll = () => {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  };

  const modalTimeId = setTimeout(openModal, 5000);

  modalBtns.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
  
  modalClose.addEventListener('click', closeModal);
  window.addEventListener('scroll', showModalByScroll);

});
