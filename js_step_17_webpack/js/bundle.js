/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const calc = () => {
  const result = document.querySelector('.calculating__result span');
  let sex, height, weight, age, ratio;

  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    localStorage.setItem('sex', 'female');
    sex = 'female';
  }

  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    localStorage.setItem('ratio', 1.375);
    ratio = 1.375;
  }

  const initLocalSettings = (selector, activeClass) => {
    const elems = document.querySelectorAll(selector);
    elems.forEach(elem => {
      if (elem.getAttribute('data-sex') === localStorage.getItem('sex')) elem.classList.add(activeClass);
      if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) elem.classList.add(activeClass);
    });
  };

  const calcTotal = () => {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '____';
      return;
    }

    if (sex == 'female') {
      result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
    } else {
      result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
    }
  };

  const getStaticInformation = (selector, activeClass) => {
    const elems = document.querySelectorAll(selector);
    elems.forEach(elem => {
      elem.addEventListener('click', e => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', ratio);
        }

        if (e.target.getAttribute('data-sex')) {
          sex = e.target.getAttribute('data-sex');
          localStorage.setItem('sex', sex);
        }

        elems.forEach(elem => elem.classList.remove(activeClass));
        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  };

  const getDynamicInformation = selector => {
    const input = document.querySelector(selector);
    input.addEventListener('input', () => {
      if (input.value.match(/\D/g)) {
        input.style.border = '1px solid red';
      } else {
        input.style.border = 'none';
      }

      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;

        case 'weight':
          weight = +input.value;
          break;

        case 'age':
          age = +input.value;
          break;
      }

      calcTotal();
    });
  };

  calcTotal();
  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');
};

/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


const cards = () => {
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
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

    changeToUAH() {
      this.price *= this.transfer;
    }

    render() {
      const div = document.createElement('div');

      if (this.classes.length === 0) {
        this.class = 'menu__item';
        div.classList.add(this.class);
      } else {
        this.classes.forEach(className => div.classList.add(className));
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

  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getMenu)('http://localhost:3000/menu').then(data => {
    data.forEach(({
      img,
      altimg,
      title,
      descr,
      price
    }) => {
      new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    });
  }); // axios.get('http://localhost:3000/menu')
  //   .then(response => console.log(response.data));
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
};

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



const forms = (formsSelector, modalTimeId) => {
  const forms = document.querySelectorAll(formsSelector);
  const message = {
    loading: "icons/spinner.svg",
    success: 'Спасибо! Скоро мы с вами свяжемся!',
    failure: 'Что-то пошло не так...'
  };

  const thanksMessage = message => {
    const modalDialog = document.querySelector('.modal__dialog');
    modalDialog.classList.add('hide');
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimeId);
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
      div.remove(); // modalDialog.classList.add('show');

      modalDialog.classList.remove('hide');
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
    }, 2000);
  };

  const bindPostData = form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let statusMessage = document.createElement('img');
      statusMessage.style.cssText = `
        display: block;
        margin: 10px auto 0;
      `;
      statusMessage.src = message.loading;
      form.insertAdjacentElement('afterend', statusMessage); // Используем без JSON - не пишем headers, и не перебераем formData в объект
      // Используем JSON

      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json).then(data => {
        console.log(data);
        thanksMessage(message.success);
      }).catch(() => thanksMessage(message.failure)).finally(() => {
        form.reset();
        statusMessage.remove();
      });
    });
  };

  forms.forEach(form => bindPostData(form));
};

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": function() { return /* binding */ closeModal; },
/* harmony export */   "openModal": function() { return /* binding */ openModal; }
/* harmony export */ });
const closeModal = modalSelector => {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
};

const openModal = (modalSelector, modalTimeId) => {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';

  if (modalTimeId) {
    clearTimeout(modalTimeId);
  }
};

const modal = (modalTrigger, modalSelector, modalTimeId) => {
  const modal = document.querySelector(modalSelector),
        modalBtns = document.querySelectorAll(modalTrigger);

  const showModalByScroll = () => {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal(modalSelector, modalTimeId);
      window.removeEventListener('scroll', showModalByScroll);
    }
  };

  modalBtns.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalSelector, modalTimeId));
  });
  modal.addEventListener('click', event => {
    if (event.target === modal || event.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  });
  document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal(modalSelector);
    }
  });
  window.addEventListener('scroll', showModalByScroll);
};

/* harmony default export */ __webpack_exports__["default"] = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./js/modules/timer.js");


const slider = ({
  container,
  slide,
  wrapper,
  inner,
  arrowsBtn,
  totalCounter,
  currentCounter
}) => {
  // Слайдер - 2 вариант
  const slider = document.querySelector(container),
        slides = document.querySelectorAll(slide),
        slidesWrapper = document.querySelector(wrapper),
        slidesInner = document.querySelector(inner),
        arrows = document.querySelector(arrowsBtn),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        width = window.getComputedStyle(slidesWrapper).width;
  let index = 1;
  let offset = 0;
  total.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(slides.length);
  current.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(index);
  slidesInner.style.cssText = `
    width: ${100 * slides.length}%;
    display: flex;
    transition: all 0.4s ease;
  `;
  slidesWrapper.style.overflow = 'hidden';
  slides.forEach(slides => slides.style.width = width);
  slider.style.position = 'relative';
  const indicators = document.createElement('ol');
  const dots = []; // indicators.classList.add('carousel-indicators');

  indicators.style.cssText = `
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 15;
      display: flex;
      justify-content: center;
      margin-right: 15%;
      margin-left: 15%;
      list-style: none;
  `; // Если хотите - добавьте в стили, но иногда у нас нет доступа к стилям

  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slides-to', i + 1);
    dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
    `;
    if (i == 0) dot.style.opacity = '1';
    indicators.append(dot);
    dots.push(dot);
  }

  const showSlide = (offset, index) => {
    slidesInner.style.transform = `translateX(${-offset}px)`;
    current.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(index);
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[index - 1].style.opacity = '1';
  };

  const deleteNotDigits = str => +str.replace(/\D/g, '');

  arrows.addEventListener('click', e => {
    const target = e.target;

    if (target.closest('.offer__slider-prev')) {
      if (offset == 0) offset = deleteNotDigits(width) * (slides.length - 1);else offset -= deleteNotDigits(width);
      if (index == 1) index = slides.length;else index--;
      showSlide(offset, index);
    }

    if (target.closest('.offer__slider-next')) {
      if (offset == deleteNotDigits(width) * (slides.length - 1)) offset = 0;else offset += deleteNotDigits(width);
      if (index == slides.length) index = 1;else index++;
      showSlide(offset, index);
    }
  });
  dots.forEach(dot => {
    dot.addEventListener('click', e => {
      const slideTo = e.target.getAttribute('data-slides-to');
      index = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);
      showSlide(offset, index);
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (slider); // Слайдер - 1 вариант
// const total = document.querySelector('#total'),
//       current = document.querySelector('#current'),
//       slides = document.querySelectorAll('.offer__slide'),
//       arrows = document.querySelector('.offer__slider-counter');
// let index = 0;
// total.textContent = getZero(slides.length);
// const hideSlider = () => {
//   slides.forEach(slides => {
//     slides.classList.add('hide');
//     slides.classList.remove('show');
//   });
// };
// const showSlider = (i) => {
//   slides[i].classList.remove('hide');
//   slides[i].classList.add('show');
//   current.textContent = getZero(index + 1);
// };
// arrows.addEventListener('click', (e) => {
//   const target = e.target;
//   if (target.closest('.offer__slider-prev')) {
//     (index <= 0) ? index = slides.length - 1 : index--;
//     hideSlider();
//     showSlider(index);
//   } else if (target.closest('.offer__slider-next')) {
//     (index >= slides.length - 1) ? index = 0 : index++;
//     hideSlider();
//     showSlider(index);
//   }
// });
// hideSlider();
// showSlider(index)

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const tabs = (tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) => {
  const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

  const hideTabContent = () => {
    tabs.forEach(item => item.classList.remove(activeClass));
    tabsContent.forEach(item => {
      item.classList.remove('show');
      item.classList.add('hide');
    });
  };

  const showTabContent = (i = 0) => {
    tabs[i].classList.add(activeClass);
    tabsContent[i].classList.remove('hide');
    tabsContent[i].classList.add('show');
  };

  hideTabContent();
  showTabContent();
  tabsParent.addEventListener('click', event => {
    const target = event.target;

    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, i) => {
        if (item == target) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getZero": function() { return /* binding */ getZero; }
/* harmony export */ });
const getZero = num => {
  num = num >= 0 && num < 10 ? `0${num}` : num;
  return num;
};

const timer = (selector, deadline) => {
  const getTimeRemaining = endtime => {
    let total = Date.parse(endtime) - Date.parse(new Date());
    let d = Math.floor(total / (1000 * 60 * 60 * 24));
    let h = Math.floor(total / (1000 * 60 * 60) % 24); // общее количество часов делем сколько в одном дне часов

    let m = Math.floor(total / (1000 * 60) % 60);
    let s = Math.floor(total / 1000 % 60);
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
          hours = timer.querySelector('#hours'),
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

/* harmony default export */ __webpack_exports__["default"] = (timer);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": function() { return /* binding */ postData; },
/* harmony export */   "getMenu": function() { return /* binding */ getMenu; }
/* harmony export */ });
const postData = async (url, data) => {
  let res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8'
    },
    body: data
  });
  return await res.json();
};

const getMenu = async url => {
  let res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Ошибка по адресу: ${url}, статус ${res.status}!`);
    a;
  }

  return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");








document.addEventListener("DOMContentLoaded", () => {
  const modalTimeId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.openModal)('.modal', modalTimeId), 50000);
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__.default)('.timer', '2021-05-08');
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.default)('[data-modal]', '.modal', modalTimeId);
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__.default)();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__.default)('form', modalTimeId);
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_5__.default)();
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__.default)({
    container: '.offer__slider',
    slide: '.offer__slide',
    wrapper: '.offer__slider-wrapper',
    inner: '.offer__slider-inner',
    arrowsBtn: '.offer__slider-counter',
    totalCounter: '#total',
    currentCounter: '#current'
  });
});
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map