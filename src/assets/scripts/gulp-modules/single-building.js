$(document).ready(() => {
  const galleryThumbs = new Swiper(".product-gallery__thumbs", {
    centeredSlides: true,
    centeredSlidesBounds: true,
    slidesPerView: 4,
    watchOverflow: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    direction: 'vertical',
    spaceBetween: 10
  });

  const galleryMain = new Swiper(".product-gallery__main", {
    watchOverflow: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    preventInteractionOnTransition: true,
    navigation: {
      nextEl: '.cntrl-prod-gal__arrow_next',
      prevEl: '.cntrl-prod-gal__arrow_prev',
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    thumbs: {
      swiper: galleryThumbs
    }
  });

  galleryMain.on('slideChangeTransitionStart', () => {
    galleryThumbs.slideTo(galleryMain.activeIndex);
  });

  galleryThumbs.on('transitionStart', () => {
    galleryMain.slideTo(galleryThumbs.activeIndex);
  });


  // TABS
  const removeClass = (array, className) => {
    array.forEach((item, _) => {
      item.classList.remove(className);
    })
  }

  const setTabHeight = (activeTab, container) => {
    const activeTabItem = document.querySelector(activeTab);
    const containerItem = document.querySelector(container);
    const tabHeight = activeTabItem.offsetHeight;
    containerItem.style.height = `${tabHeight}px`;
    window.locoScroll.update();
  }


  tabSwitch = (tabClass, btnClass, containerClass) => {
    const tabBtns = document.querySelectorAll(btnClass);
    const tabs = document.querySelectorAll(tabClass);

    tabBtns.forEach((btn, _) => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        removeClass(tabBtns, 'active');
        removeClass(tabs, 'active');
        this.classList.add('active');
        const activeHref = this.getAttribute('href');
        const activeTab = document.querySelector(`[data-tab="${activeHref}"]`);
        activeTab.classList.add('active');
        setTabHeight(`${tabClass}.active`, containerClass)
        window.locoScroll.update();
      })
    })
  }


  // CONSTRUCTION SLIDERS 

  const constrSliders = document.querySelectorAll('.js-constr-slider');

  constrSliders.forEach((item, _) => {
    const slider = new Swiper(item, {
      slidesPerView: 3,
      spaceBetween: 30,
    })
		
    const slideWrapper = item.closest('.constr-slider');
    const nextArrow = slideWrapper.querySelector('.constr-slider__arrow_next');
    const prevArrow = slideWrapper.querySelector('.constr-slider__arrow_prev');

    nextArrow.addEventListener('click', () => {
      slider.slideNext();
    })
    prevArrow.addEventListener('click', () => {
      slider.slidePrev();
    })
  })

  setTabHeight('.js-constr-single-tab.active', '.js-constr-content');
  setTabHeight('.js-single-tab.active', '.js-tab-content');

  tabSwitch('.js-single-tab', '.js-tab-btn', '.js-tab-content');
  tabSwitch('.js-constr-single-tab', '.js-constr-tab-btn', '.js-constr-content');
});
