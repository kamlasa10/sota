$(document).ready(() => {
  $('.js-preview-slider-next').hover(
		 function () {
      $(this).parent().find('.preview-slider-control__line-active').addClass('preview-slider-control__line-active_full')
    }, function () {
      $(this).parent().find('.preview-slider-control__line-active').removeClass('preview-slider-control__line-active_full')
    }
  );
  $('.js-preview-slider-prev').hover(
    function () {
		 	$(this).parent().find('.preview-slider-control__line-active').addClass('preview-slider-control__line-active_min')
    }, function () {
      $(this).parent().find('.preview-slider-control__line-active').removeClass('preview-slider-control__line-active_min')
    }
  )


  // SLIDER

  const currentSlide = document.querySelector('.js-current-slide');
  const totalSlides = document.querySelector('.js-total-slides');
  const progressBarActive = document.querySelector('.preview-progress-bar__line-progress');
  const nextSlidePreview = document.querySelector('.preview_next');
  const prevSlidePreview = document.querySelector('.preview_prev');

  let prevSlideData = {};
  let nextSlideData = {};

  const swiper = new Swiper('.js-review-slider', {
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
      nextEl: '.js-preview-slider-next',
      prevEl: '.js-preview-slider-prev',
    }
  });

	
  const update = () => {
    currentSlide.innerHTML = `0${swiper.realIndex + 1}`;
    const nextSlideIndex = swiper.realIndex + 1;
    const prevSlideIndex = swiper.realIndex - 1;

    if (nextSlideIndex < swiper.slides.length) {
      nextSlideData = {
        img: swiper.slides[nextSlideIndex].querySelector('img').src,
        text: swiper.slides[nextSlideIndex].querySelector('.js-preview-text').innerHTML
      }
    } else if (nextSlideIndex === swiper.slides.length) {
      nextSlideData = {
        img: swiper.slides[0].querySelector('img').src,
        text: swiper.slides[0].querySelector('.js-preview-text').innerHTML
      }
    }

    if (prevSlideIndex >= 0) {
      prevSlideData = {
        img: swiper.slides[prevSlideIndex].querySelector('img').src,
        text: swiper.slides[prevSlideIndex].querySelector('.js-preview-text').innerHTML
      }
    } else if (prevSlideIndex < 0) {
      console.log('0')
      prevSlideData = {
        img: swiper.slides[swiper.slides.length - 1].querySelector('img').src,
        text: swiper.slides[swiper.slides.length - 1].querySelector('.js-preview-text').innerHTML
      }
    }
			
    nextSlidePreview.querySelector('img').src = nextSlideData.img;
    nextSlidePreview.querySelector('.js-next-text').innerHTML = nextSlideData.text;

    prevSlidePreview.querySelector('img').src = prevSlideData.img;
    prevSlidePreview.querySelector('.js-prev-text').innerHTML = prevSlideData.text;
  }

  swiper.on('init', () => {
    totalSlides.innerHTML = `0${swiper.slides.length}`;
    update();
  })

  swiper.on('slideChange', () => {
    progressBarActive.style.width = `${swiper.progress * 100}%`;
    update();
  })

  swiper.init();


  // POPUP 
  
  class createReviewPopup {
    constructor(openBtns, closeBtn, popup) {
      this.openBtns = openBtns;
      this.closeBtn = closeBtn;
      this.popup = popup;
      this.slider = null;
    }

    createSlides(slidesSrcArray) {
      const self = this;

      const sliderEl = document.querySelector('.js-pu-slider-wrapper');

      slidesSrcArray.forEach((slide) => {
        const newSlide = document.createElement('div');
        const newSlideImg = document.createElement('img');
        newSlideImg.src = slide;
        newSlide.classList.add('swiper-slide');
        newSlide.appendChild(newSlideImg);
        sliderEl.appendChild(newSlide)
      })

      const nextSlide = document.querySelector('.cntrl-prod-gal__arrow_next');
      const prevSlide = document.querySelector('.cntrl-prod-gal__arrow_prev');
      this.slider = new Swiper('.pu-slider-s2__img-wrapper', {
        slidesPerView: 1,
        allowTouchMove: false,
        spaceBetween: 100,
        init: true,
        navigation: {	
          nextEl: '.cntrl-prod-gal__arrow_next',
          prevEl: '.cntrl-prod-gal__arrow_prev',
        }
      });

      // nextSlide.addEventListener('click', function(){
      //   self.slider.slideNext()
      // })
      // prevSlide.addEventListener('click', function(){
      //   self.slider.slidePrev()
      // })
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
            data: { action: 'review', id },
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

  const popupCloseBtn = document.querySelector('.js-reviews-popup-close');
  const popup = document.querySelector('.js-reviews-popup');
  const previewOpenBtn = document.querySelectorAll('.js-preview-open-popup');

  const reviewPopup = new createReviewPopup(previewOpenBtn, popupCloseBtn, popup);
  reviewPopup.init();


  const popupSwiper = new Swiper('.js-reviews-popup-main-slider', {
    speed: 1000,
    spaceBetween: 0,
    slidesPerView: 1,
    initialSlide: 0,
    init: true,
    effect: 'slide',
    fadeEffect: {
      crossFade: true
    },
    direction: 'horizontal',
    loop: false,
    allowTouchMove: false,
    // Navigation arrows
  	navigation: {	
      nextEl: '.js-reviews-pu-arrow-next',
      prevEl: '.js-reviews-pu-arrow-prev',
    }
  });
});
