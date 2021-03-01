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
        modal = document.querySelector('.modal');

  
  const closeModal = () => {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
    clearTimeout(modalTimeId);
  };

  const openModal = () => {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
  };

  const showModalByScroll = () => {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  };

  const modalTimeId = setTimeout(openModal, 50000);

  modalBtns.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  window.addEventListener('scroll', showModalByScroll);

  // Использование класса - render MenuCard

  class MenuCard {
    constructor (src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH () {
      this.price *= this.transfer; 
    }

    render() {
      const div = document.createElement('div');

      if (this.classes.length === 0) {
        this.class = 'menu__item';
        div.classList.add(this.class);
      } else {
        this.classes.forEach( className => div.classList.add(className) );
      }

      div.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `;

      this.parent.append(div);
    }
  }

  const getMenu = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Ошибка по адресу: ${url}, статус ${res.status}!`);a
    }

    return await res.json();
  };

  getMenu('http://localhost:3000/menu')
    .then(data => {
      data.forEach( ({img, altimg, title, descr, price}) => {
        new MenuCard(
          img,
          altimg,
          title,
          descr,
          price,
          '.menu .container'
        ).render();
      });
    });

  axios.get('http://localhost:3000/menu')
    .then(response => console.log(response.data));

  // 2 спопсоб рендерить карты
  // getMenu('http://localhost:3000/menu')
  //   .then(data => createCard(data));
  // function createCard(data) {
  //   data.forEach(({img, altimg, title, descr, price}) => {
  //     const element = document.createElement('div');
  //     element.classList.add('menu__item');
  //     element.innerHTML = `
  //       <img src=${img} alt=${altimg}>
  //       <h3 class="menu__item-subtitle">${title}</h3>
  //       <div class="menu__item-descr">${descr}</div>
  //       <div class="menu__item-divider"></div>
  //       <div class="menu__item-price">
  //         <div class="menu__item-cost">Цена:</div>
  //         <div class="menu__item-total"><span>${price}</span> грн/день</div>
  //       </div>`;
  //     document.querySelector('.menu .container').append(element);
  //   });
  // }
  
  // ФОРМЫ

  const forms = document.querySelectorAll('form');

  const message = {
    loading: "icons/spinner.svg",
    success: 'Спасибо! Скоро мы с вами свяжемся!',
    failure: 'Что-то пошло не так...'
  };

  const thanksMessage = (message) => {
    const modalDialog = document.querySelector('.modal__dialog');
    modalDialog.classList.add('hide');

    openModal();

    const div = document.createElement('div');
    div.classList.add('modal__dialog');
    div.innerHTML = `
      <div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector('.modal').append(div);
    setTimeout(() => {
      div.remove();
      // modalDialog.classList.add('show');
      modalDialog.classList.remove('hide');
      closeModal();
    }, 2000);
  };

  const postData = async (url, data) => {
    let res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      },
      body: data,
    });

    return await res.json();
  };

  const bindPostData = (form) => {

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let statusMessage = document.createElement('img');
      statusMessage.style.cssText = `
        display: block;
        margin: 10px auto 0;
      `;
      statusMessage.src = message.loading;
      form.insertAdjacentElement('afterend', statusMessage);

      // Используем без JSON - не пишем headers, и не перебераем formData в объект
      // Используем JSON
      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', json)
      .then((data) => {
        console.log(data);
        thanksMessage(message.success);
      })
      .catch(() => thanksMessage(message.failure))
      .finally(() => {
        form.reset();
        statusMessage.remove();
      });
    });
  };

  forms.forEach(form => bindPostData(form));

});
