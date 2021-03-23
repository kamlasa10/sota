$(document).ready(() => {
  TabChange.prototype.tabSwitch = (tabClass, btnClass, containerClass) => {
    const self = TabChange.prototype;
    const tabBtns = document.querySelectorAll(btnClass);
    const tabs = document.querySelectorAll(tabClass);
    tabBtns.forEach((btn, _) => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        self.removeClass(tabBtns, 'active');
        self.removeClass(tabs, 'active');
        const activeHref = this.getAttribute('href');
        const activeTab = document.querySelector(`[data-tab="${activeHref}"]`);

        activeTab.classList.add('active');
        const activeTabBtns = document.querySelectorAll(`a[href="${activeHref}"]`)
        activeTabBtns.forEach((item) => {
          item.classList.add('active');
        })
        
        self.setTabHeight(`${tabClass}.active`, containerClass)
        window.locoScroll.update();
      })
    })
  }
  const servicesTab = new TabChange('.js-serv-single-tab', '.js-serv-tab-btn', '.js-serv-content');
  servicesTab.init(); 

  const tabBtns = document.querySelectorAll('.js-serv-tab-btn');
  tabBtns.forEach((btn) => {
  })
});
