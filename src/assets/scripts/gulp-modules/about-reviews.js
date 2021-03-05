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

  const popupCloseBtn = document.querySelector('.js-reviews-popup-close');
  const popup = document.querySelector('.js-reviews-popup');
  const previewBtnsArray = document.querySelectorAll('.preview__main')

  popupCloseBtn.addEventListener('click', () => {
    popup.classList.remove('show')
  })

  previewBtnsArray.forEach((btn, _) => {
    btn.addEventListener('click', () => {
      popup.classList.add('show')
    })
  })

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
    // Navigation arrows
  	navigation: {	
      nextEl: '.js-reviews-pu-arrow-next',
      prevEl: '.js-reviews-pu-arrow-prev',
    }
  });
});
