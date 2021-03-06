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

export default tabs;