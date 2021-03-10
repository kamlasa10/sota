document.addEventListener('DOMContentLoaded', () => {
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
    galleryProjectThumbs.slideTo(galleryProjectMain.activeIndex);
  });

  galleryProjectThumbs.on('transitionStart', () => {
    galleryProjectMain.slideTo(galleryProjectThumbs.activeIndex);
  });


  const singleProjectTab = new TabChange('.js-proj-single-tab', '.js-proj-tab-btn', '.js-proj-tab-content');
  singleProjectTab.init();


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
    currentSlide.innerHTML = `0${swiper.realIndex + 1}`;
    const nextSlideIndex = swiper.realIndex + 1;
    const prevSlideIndex = swiper.realIndex - 1;

    // if (nextSlideIndex < swiper.slides.length) {
    //   nextSlideData = {
    //     img: swiper.slides[nextSlideIndex].querySelector('img').src,
    //     text: swiper.slides[nextSlideIndex].querySelector('.js-preview-text').innerHTML
    //   }
    // } else if (nextSlideIndex === swiper.slides.length) {
    //   nextSlideData = {
    //     img: swiper.slides[0].querySelector('img').src,
    //     text: swiper.slides[0].querySelector('.js-preview-text').innerHTML
    //   }
    // }

    // if (prevSlideIndex >= 0) {
    //   prevSlideData = {
    //     img: swiper.slides[prevSlideIndex].querySelector('img').src,
    //     text: swiper.slides[prevSlideIndex].querySelector('.js-preview-text').innerHTML
    //   }
    // } else if (prevSlideIndex < 0) {
    //   prevSlideData = {
    //     img: swiper.slides[swiper.slides.length - 1].querySelector('img').src,
    //     text: swiper.slides[swiper.slides.length - 1].querySelector('.js-preview-text').innerHTML
    //   }
    // }
			
    // nextSlidePreview.querySelector('img').src = nextSlideData.img;
    // nextSlidePreview.querySelector('.js-next-text').innerHTML = nextSlideData.text;

    // prevSlidePreview.querySelector('img').src = prevSlideData.img;
    // prevSlidePreview.querySelector('.js-prev-text').innerHTML = prevSlideData.text;
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
})
