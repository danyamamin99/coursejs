import {getZero} from './timer';

const slider = ({container, slide, wrapper, inner, arrowsBtn, totalCounter, currentCounter}) => {
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

  total.textContent = getZero(slides.length);
  current.textContent = getZero(index);

  slidesInner.style.cssText = `
    width: ${100 * slides.length}%;
    display: flex;
    transition: all 0.4s ease;
  `;
  slidesWrapper.style.overflow = 'hidden';
  slides.forEach(slides => slides.style.width = width);
  slider.style.position = 'relative';

  const indicators = document.createElement('ol');
  const dots = [];
  // indicators.classList.add('carousel-indicators');
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
    current.textContent = getZero(index);
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[index - 1].style.opacity = '1';
  };

  const deleteNotDigits = (str) => +str.replace(/\D/g, '');

  arrows.addEventListener('click', (e) => {
    const target = e.target;

    if (target.closest('.offer__slider-prev')) {

      if (offset == 0) offset = deleteNotDigits(width) * (slides.length - 1);
      else offset -= deleteNotDigits(width);

      if (index == 1) index = slides.length;
      else index--;

      showSlide(offset, index);
    }

    if (target.closest('.offer__slider-next')) {

      if (offset == deleteNotDigits(width) * (slides.length - 1)) offset = 0;
      else offset += deleteNotDigits(width);

      if (index == slides.length) index = 1;
      else index++;

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

export default slider;


  // Слайдер - 1 вариант
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