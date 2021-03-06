import tabs from './modules/tabs';
import timer from './modules/timer';
import modal from './modules/modal';
import cards from './modules/cards';
import forms from './modules/forms';
import calc from './modules/calc';
import slider from './modules/slider';
import {openModal} from './modules/modal';

document.addEventListener("DOMContentLoaded", () => {

  const modalTimeId = setTimeout(() => openModal('.modal', modalTimeId), 50000);
        
  tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  timer('.timer', '2021-05-08');
  modal('[data-modal]', '.modal', modalTimeId);
  cards();
  forms('form', modalTimeId);
  calc();
  slider({
    container: '.offer__slider',
    slide: '.offer__slide',
    wrapper: '.offer__slider-wrapper',
    inner: '.offer__slider-inner',
    arrowsBtn: '.offer__slider-counter',
    totalCounter: '#total',
    currentCounter: '#current'
  });

});
