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
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
  };

  const getStaticInformation = (selector, activeClass) => {
    const elems = document.querySelectorAll(selector);

    elems.forEach(elem => {
      elem.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', ratio)
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

  const getDynamicInformation = (selector) => {
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

export default calc;