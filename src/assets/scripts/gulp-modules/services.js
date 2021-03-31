$(document).ready(() => {
  TabChange.prototype.tabSwitch = (tabClass, btnClass, containerClass) => {
    const self = TabChange.prototype;
    const tabBtns = document.querySelectorAll(btnClass);
    const tabs = document.querySelectorAll(tabClass);
    if ($(window).width() <= 1024) {
      $(tabClass).hide();
      $(`${tabClass}.active`).show();
    }
    tabBtns.forEach((btn, _) => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        if ($(window).width() > 1024) {
          self.removeClass(tabBtns, 'active');
          self.removeClass(tabs, 'active');
          const activeHref = this.getAttribute('href');
          const activeTab = document.querySelector(`[data-tab="${activeHref}"]`);
  
          activeTab.classList.add('active');
          const activeTabBtns = document.querySelectorAll(`a[href="${activeHref}"]`)
          activeTabBtns.forEach((item) => {
            item.classList.add('active');
          })
          
          self.setTabHeight(`${tabClass}.active`, containerClass);
  
          window.locoScroll.update();
        } else {
          self.removeClass(tabBtns, 'active');
          self.removeClass(tabs, 'active');
          $(tabs).hide();
          this.classList.add('active');
          const activeHref = this.getAttribute('href');
          const activeTab = document.querySelector(`[data-tab="${activeHref}"]`);
          activeTab.classList.add('active');
          const activeTabBtns = document.querySelectorAll(`a[href="${activeHref}"]`)
          activeTabBtns.forEach((item) => {
            item.classList.add('active');
          })
          $(`[data-tab="${activeHref}"]`).show();
          self.setTabHeight(`${tabClass}.active`, containerClass);
        }
      })
    })
  }
  const servicesTab = new TabChange('.js-serv-single-tab', '.js-serv-tab-btn', '.js-serv-content');
  servicesTab.init(); 

  const tabBtns = document.querySelectorAll('.js-serv-tab-btn');
  tabBtns.forEach((btn) => {
  })


  let scrolling = 1;
  $(".table-services__table-header").scroll(function () {
    if (scrolling == 1) {
      scrolling = 0;
      $(this).next()
        .scrollLeft($(this).scrollLeft());
    } else {
      scrolling = 1;
    }
  });
  $(".table-services__table-wrapper").scroll(function () {
    if (scrolling == 1) {
      scrolling = 0;
      $(this).prev()
        .scrollLeft($(this).scrollLeft());
    } else {
      scrolling = 1
    }
  });
});
