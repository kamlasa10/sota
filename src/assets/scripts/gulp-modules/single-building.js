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
      activeImgSrc: $($('.product-gallery__main').find('.swiper-slide img')[0]).attr('src'),
      projectPrice: $('.js-active-choise-plan').val(),
    }
    $('.js-project-price').text(`${dataForProjectForm.projectPrice}$`)
    $('.header-pu-form__title').text(window.dataForProjectForm.name)
    $('.js-choise-img-form').attr('src', window.dataForProjectForm.activeImgSrc)

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
    breakpoints: {
      320: {
        slidesPerView: 1.3,
        effect: 'slide',
        centeredSlides: true,
        loop: true,
        spaceBetween: 10
      },
      640: {
        slidesPerView: 1,
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        centeredSlides: false,
        loop: false,
        spaceBetween: 0
      }
    },
    watchOverflow: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    preventInteractionOnTransition: true,
    navigation: {
      nextEl: '.cntrl-prod-gal__arrow_next',
      prevEl: '.cntrl-prod-gal__arrow_prev',
    },
    thumbs: {
      swiper: galleryThumbs
    }
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
    breakpoints: {
      320: {
        slidesPerView: 1.3,
        effect: 'slide',
        centeredSlides: true,
        loop: true,
        spaceBetween: 10
      },
      640: {
        slidesPerView: 1,
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        centeredSlides: false,
        loop: false,
        spaceBetween: 0
      }
    },
    watchOverflow: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    preventInteractionOnTransition: true,
    navigation: {
      nextEl: '.cntrl-prod-gal__arrow_next',
      prevEl: '.cntrl-prod-gal__arrow_prev',
    },
    
    thumbs: {
      swiper: galleryProjectThumbs
    },

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
    breakpoints: {
      320: {
        slidesPerView: 1.3,
        effect: 'slide',
        centeredSlides: true,
        loop: true,
        spaceBetween: 10
      },
      640: {
        slidesPerView: 1,
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        centeredSlides: false,
        loop: false,
        spaceBetween: 0
      }
    },
    speed: 1000,
    initialSlide: 0,
    init: false,
    direction: 'horizontal',
    loop: false,
    // Navigation arrows
    navigation: {	
      nextEl: '.js-tab-next',
      prevEl: '.js-tab-prev',
    }
  });
  
  const update = () => {
    const currentSlideNumber = document.querySelector('.js-current-slide');
    const slideIdx = swiper.realIndex;
    const slideSubtitle = document.querySelector('.slider-control__subtitle');
    const currentSlide = swiper.slides[slideIdx];
    const currentSlideDataText = currentSlide.querySelector('img').dataset.name;
    slideSubtitle.innerHTML = currentSlideDataText;
    currentSlideNumber.innerHTML = slideIdx < 9 ? `0${slideIdx + 1}` : slideIdx + 1;
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

  class createImgPopup {
    constructor(openBtn) {
      this.openBtn = openBtn;
      this.popup = document.querySelector('.js-open-img-popup');
      this.closeBtn = document.querySelector('.js-open-img-popup-close');
      this.imgWrapper = document.querySelector('.js-img-wrapper');
      this.slider = null;
    }

    eventListeners() {
      const self = this;
      this.openBtn.forEach((btn) => {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          const swiperWrapper = this.closest('.swiper-wrapper');
          const imgs = swiperWrapper.querySelectorAll('img')
          imgs.forEach((slide) => {
            const newSlide = document.createElement('div');
            const newSlideImg = document.createElement('img');
            newSlideImg.src = slide.getAttribute('src');
            newSlide.classList.add('swiper-slide');
            newSlide.appendChild(newSlideImg);
            self.imgWrapper.appendChild(newSlide)
          })

          self.slider = new Swiper('.js-img-pu-slider', {
            slidesPerView: 1,
            allowTouchMove: false,
            spaceBetween: 100,
            init: true,
            navigation: {	
              nextEl: '.js-img-pu-arrow-next',
              prevEl: '.js-img-pu-arrow-prev',
            }
          });
          self.popup.classList.add('show');
        })
      })

      this.closeBtn.addEventListener('click', (e) => {
        const newImg = document.querySelector('.js-img-for-popup');
        // newImg.remove();
        self.clearPopup();
        self.popup.classList.remove('show');
      })
    }

    clearPopup() {
      this.slider.destroy(true, true);
      while (this.imgWrapper.firstChild) {
        this.imgWrapper.firstChild.remove();
      }
    }

    init() {
      this.eventListeners();
    }
  }
  const imgBtns = document.querySelectorAll('.js-open-big-img');
  const openImgPopup = new createImgPopup(imgBtns);
  openImgPopup.init();
  if ($(window).width() <= 1024) {
    try {
      const mobToggleBtn = document.querySelector('.mob-toggle-btn__btn');
      const projectTable = document.querySelector('.project-specs-tab__spec-table');
      const optimaLabel = document.querySelector('.mob-toggle-btn__text_optima');
      const primeLabel = document.querySelector('.mob-toggle-btn__text_prime');
  
      mobToggleBtn.addEventListener('click', () => {
        if (mobToggleBtn.checked) {
          optimaLabel.classList.remove('active');
          projectTable.classList.remove('project-specs-tab__spec-table_optima');
          projectTable.classList.add('project-specs-tab__spec-table_prime');
          primeLabel.classList.add('active');
        } else {
          primeLabel.classList.remove('active');
          optimaLabel.classList.add('active');
          projectTable.classList.remove('project-specs-tab__spec-table_prime');
          projectTable.classList.add('project-specs-tab__spec-table_optima');
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
});
