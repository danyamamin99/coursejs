const closeModal = (modalSelector) => {
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

  modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal(modalSelector);
    }
  });

  window.addEventListener('scroll', showModalByScroll);

};

export default modal;
export {closeModal};
export {openModal};