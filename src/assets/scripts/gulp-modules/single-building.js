function changeValueByProp(prop, value) {
  window.dataForProjectForm[prop] = value
}

function setNewProjectPrice(prop, value) {
  changeValueByProp(prop, value)

  $('.js-project-price').text(value)
  $('.js-current-project-value').text(value)
}

$(document).ready(() => {
  try {
    window.dataForProjectForm = {
      name: $('.build-descr__title').text(),
      activeImgSrc: $('.js-project-main-slider .swiper-slide-active img').attr('src'),
      projectPrice: $('.js-active-choise-plan').val(),
    }
    console.log($('.js-project-main-slider .swiper-wrapper .swiper-slide-active'))
    $('.js-project-price').text(`${dataForProjectForm.projectPrice}$`)
    $('.header-pu-form__title').text(window.dataForProjectForm.name)

    $('[data-price]').on('change', (e) => {
      const currentPrice = $(e.target).data().price
      const currentChoisePlanName = $(e.target).attr('id')

      setNewProjectPrice('projectPrice', `${currentPrice}$`)
      $('[name=sotaseries]').checked = ''
      $(`[data-plan-name=${currentChoisePlanName}]`).attr('checked', 'checked')
    })
  } catch (e) {}

  const galleryThumbs = new Swiper(".js-gallery-thumbs", {
    centeredSlides: true,
    centeredSlidesBounds: true,
    slidesPerView: 4,
    watchOverflow: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    direction: 'vertical',
    spaceBetween: 10
  });

  const galleryMain = new Swiper(".js-gallery-main", {
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
    // galleryThumbs.slideTo(galleryMain.activeIndex);
  });

  galleryThumbs.on('transitionStart', () => {
    // galleryMain.slideTo(galleryThumbs.activeIndex);
  });

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

  // TABS


  // AJAX CONSTRUCTION POPUP
	
  class createReviewPopup {
    constructor(openBtns, closeBtn, popup) {
      this.openBtns = openBtns;
      this.closeBtn = closeBtn;
      this.popup = popup;
      this.slider = null;
    }

    createSlides(slidesSrcArray) {
      const self = this;
      const sliderWrapper = document.querySelector('.js-construction-popup-main-slider')
      const sliderEl = sliderWrapper.querySelector('.swiper-wrapper');
      console.log(sliderWrapper);
      console.log(sliderEl)

      slidesSrcArray.forEach((slide) => {
        const newSlide = document.createElement('div');
        const newSlideImg = document.createElement('img');
        newSlideImg.src = slide;
        newSlide.classList.add('swiper-slide');
        newSlide.appendChild(newSlideImg);
        sliderEl.appendChild(newSlide)
      })

      this.slider = new Swiper('.js-construction-popup-main-slider', {
        slidesPerView: 1,
        allowTouchMove: false,
        spaceBetween: 0,
        init: true,
        navigation: {	
          nextEl: '.js-reviews-pu-arrow-next',
          prevEl: '.js-reviews-pu-arrow-prev',
        }
      });
    }

    clearPopup() {
      this.slider.destroy(true, true);
      while (document.querySelector('.js-pu-slider-wrapper').firstChild) {
        document.querySelector('.js-pu-slider-wrapper').firstChild.remove();
      }
    }

    eventListeners() {
      const self = this;
      this.openBtns.forEach((btn) => {
        btn.addEventListener('click', function () {
          const { id } = $(this).data();
          $.ajax({
            method: 'POST',
            url: "/wp-admin/admin-ajax.php",
            data: { action: 'progress', id },
            beforeSend() { // Before we send the request, remove the .hidden class from the spinner and default to inline-block.
  
            },
            success(resp) {
              const respObj = JSON.parse(resp)
              const slides = respObj.slider;
              self.createSlides(slides);

                
              $('.pu-slider-s2__text').html = respObj.text
              self.popup.classList.add('show');
            },
            error(error) {
              console.log(error)
            },
            complete() { // Set our complete callback, adding the .hidden class and hiding the spinner.
            }
          })
        })
      })


      this.closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        self.clearPopup();
        self.popup.classList.remove('show')
      })
    }

    init() {
      this.eventListeners();
    }
  }

  const popupCloseBtn = document.querySelector('.js-construction-popup-close');
  const popup = document.querySelector('.js-construction-popup');
  const previewOpenBtn = document.querySelectorAll('.constr-slide');

  const reviewPopup = new createReviewPopup(previewOpenBtn, popupCloseBtn, popup);
  reviewPopup.init();


  /** *********************************************** */
  /*          SINGLE PROJECT BUILDING                */
  /** *********************************************** */

  
  const galleryProjectThumbs = new Swiper(".js-project-thumb-slider", {
    centeredSlides: true,
    centeredSlidesBounds: true,
    slidesPerView: 4,
    watchOverflow: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    direction: 'vertical',
    spaceBetween: 10
  });
  
  const galleryProjectMain = new Swiper(".js-project-main-slider", {
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
      swiper: galleryProjectThumbs
    }
  });
  
  galleryProjectMain.on('slideChangeTransitionStart', () => {
    // galleryProjectThumbs.slideTo(galleryProjectMain.activeIndex);
    
    try { 
      changeValueByProp(
        'activeImgSrc', 
        $('.js-project-main-slider swiper-slide-active img').attr('src')
      )
      $('.js-choise-img-form').attr('src', window.dataForProjectForm.activeImgSrc)
    } catch (e) {}
  });
  
  galleryProjectThumbs.on('transitionStart', () => {
    // galleryProjectMain.slideTo(galleryProjectThumbs.activeIndex);
  });


  if ($('.js-constr-single-tab').length != 0) {
    const constrTab = new TabChange('.js-constr-single-tab', '.js-constr-tab-btn', '.js-constr-content');
    const singleTab = new TabChange('.js-single-tab', '.js-tab-btn', '.js-tab-content');
  
    constrTab.init();
    singleTab.init();
  } else {
    const singleProjectTab = new TabChange('.js-proj-single-tab', '.js-proj-tab-btn', '.js-proj-tab-content');
    singleProjectTab.init();    
  }

  
  const swiper = new Swiper('.js-plan-slider', {
    speed: 1000,
    spaceBetween: 0,
    slidesPerView: 1,
    initialSlide: 0,
    init: false,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    direction: 'horizontal',
    loop: false,
    // Navigation arrows
    navigation: {	
      nextEl: '.js-tab-next',
      prevEl: '.js-tab-prev',
    }
  });
  
  const update = () => {
    const currentSlide = document.querySelector('.js-current-slide');
    currentSlide.innerHTML = swiper.realIndex < 9 ? `0${swiper.realIndex + 1}` : swiper.realIndex + 1;
  }
  
  swiper.on('init', () => {
    const totalSlides = document.querySelector('.js-total-slides')
    totalSlides.innerHTML = swiper.slides.length < 10 ? `0${swiper.slides.length}` : `${swiper.slides.length}`;
    update();
  })
  
  swiper.on('slideChange', () => {
    update();
  })
  
  swiper.init();
});
