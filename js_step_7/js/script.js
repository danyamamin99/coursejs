document.addEventListener("DOMContentLoaded", () => {
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
  
});