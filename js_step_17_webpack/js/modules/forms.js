import {closeModal, openModal} from './modal';
import {postData} from '../services/services';


const forms = (formsSelector, modalTimeId) => {

  const forms = document.querySelectorAll(formsSelector);

  const message = {
    loading: "icons/spinner.svg",
    success: 'Спасибо! Скоро мы с вами свяжемся!',
    failure: 'Что-то пошло не так...',
  };

  const thanksMessage = (message) => {
    const modalDialog = document.querySelector('.modal__dialog');
    modalDialog.classList.add('hide');

    openModal('.modal', modalTimeId);

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
      closeModal('.modal');
    }, 2000);
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

};

export default forms;