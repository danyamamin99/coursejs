'use strict';

const form = document.querySelector('.form-signin'),
      checkbox = form.querySelector('#checkbox'),
      color = document.querySelector('#color');

if (localStorage.getItem('isChecked')) checkbox.checked = true;
if (localStorage.getItem('bg')) form.style.background = 'red';

checkbox.addEventListener('change', () => {
  localStorage.setItem('isChecked', true);
});

color.addEventListener('click', () => {
  if (localStorage.getItem('bg')) {
    localStorage.removeItem('bg')
    form.style.background = 'white';
  } else {
    localStorage.setItem('bg', 'change');
    form.style.background = 'red'; 
  }
});