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
      activeImgSrc: $('.js-project-main-slider swiper-slide-active img').attr('src'),
      projectPrice: $('.js-active-choise-plan').data().price,
    }
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
	
  class CreatePopupData {
    constructor() {
      this.markup = this.markup.bind(this);
      this.$constructionSlider = $('.js-construction-slider');
      this.selectedReportId = null;
      this.selectedReportObj = null;
      this.nextReport = null;
      this.prevReport = null;
    }

    // getCurrentReport(id){
    // 	const self = this;

    // 	return new Promise(function(resolve, reject){
    // 		$.ajax({
    // 			method: 'POST',
    // 			url: "/wp-admin/admin-ajax.php",
    // 			data: {action: 'progress', id },
    // 			beforeSend: function () { // Before we send the request, remove the .hidden class from the spinner and default to inline-block.
    // 				$('.loader-wrap').css('opacity', '0.5')
    // 				$('.js-construction-slider').fadeOut()
    // 				$('.loader-wrap').show()
    // 		},
    // 			success: function(resp){
    // 				resolve(resp)
    // 			},
    // 			error: function(error){
    // 				reject(error)
    // 			},
    // 			complete: function () { // Set our complete callback, adding the .hidden class and hiding the spinner.
    // 				$('.loader-wrap').hide()
    // 				$('.js-construction-slider').fadeIn()
    // 		},
    // 		})
    // 	})
    // }

    clearPopup() {
      this.$constructionSlider.slick('unslick');
      while (document.querySelector('.js-construction-slider').firstChild) {
        document.querySelector('.js-construction-slider').firstChild.remove()
      }
    }

    // hideReportButton(reportButton){
    // 	$(`.${reportButton}`).css('opacity', '0').css('pointerEvents', 'none')
    // }

    // showReportButton(reportButton){
    // 	$(`.${reportButton}`).css('opacity', '1').css('pointerEvents', 'all')
    // }

    // checkNextReport(id, nextOrPrev){
    // 	if (nextOrPrev === 'next'){
    // 		if (id){
    // 			this.nextReport = id
    // 			this.showReportButton('report-btn_next');
    // 		} else {
    // 			this.nextReport = null;
    // 			this.hideReportButton('report-btn_next');
    // 		}
    // 	} else if (nextOrPrev === 'prev'){
    // 		if (id){
    // 			this.prevReport = id
    // 			this.showReportButton('report-btn_prev');
    // 		} else {
    // 			this.prevReport = null;
    // 			this.hideReportButton('report-btn_prev');
    // 		}
    // 	}
    // }

    eventListeners() {
      const self = this;
      const constructionArray = document.querySelectorAll('.constr-slide');
      const constructionPopup = document.querySelector('.js-construction-popup');
      const constructionPopupCloseBtn = document.querySelector('.js-construction-popup-close');
      const nextReport = document.querySelector('.report-btn_next');
      const prevReport = document.querySelector('.report-btn_prev');

      // nextReport.addEventListener('click', function(){
      // 	self.clearPopup();
      // 	self.resolveResport(self.getCurrentReport(self.nextReport));
      // 	const nextRepotId = $(`[data-id="${self.nextReport}"]`).data('next');
      // 	const prevRepotId = $(`[data-id="${self.nextReport}"]`).data('prev');
      // 	self.checkNextReport(nextRepotId, 'next');
      // 	if (prevRepotId){
      // 		self.prevReport = prevRepotId;
      // 		self.showReportButton('report-btn_prev');	
      // 	}
      // })

      // prevReport.addEventListener('click', function(){
      // 	self.clearPopup();
      // 	self.resolveResport(self.getCurrentReport(self.prevReport));
      // 	const prevRepotId = $(`[data-id="${self.prevReport}"]`).data('prev');
      // 	const nextRepotId = $(`[data-id="${self.prevReport}"]`).data('next');
      // 	self.checkNextReport(prevRepotId, 'prev');
      // 	if (nextRepotId){
      // 		self.nextReport = nextRepotId;
      // 		self.showReportButton('report-btn_next');	
      // 	}
      // })

      constructionArray.forEach((construction, index) => {
        construction.addEventListener('click', (e) => {
          e.preventDefault();
					
          // self.checkNextReport(this.dataset.next, 'next');
          // self.checkNextReport(this.dataset.prev, 'prev');
          // self.selectedReportId = this.dataset.id
          // self.resolveResport(self.getCurrentReport(self.selectedReportId));
					
          constructionPopup.classList.add('show');
        })
      })

      constructionPopupCloseBtn.addEventListener('click', () => {
        constructionPopup.classList.remove('show');
        self.nextReport = null;
        self.prevReport = null;				
        self.clearPopup();
      })
    }

    resolveResport(promise) {
      const self = this;
      promise.then((resp) => {
        const { slider, date, month } = JSON.parse(resp);
        self.markup(slider, date, month)
        self.slickSliderInit();
      })
    }
		
    markup(slider, date, month) {
      const self = this;
      const monthEl = document.querySelector('.construction-popup__title');
      const sliderEl = document.querySelector('.js-construction-slider');
      const dateEl = document.querySelector('.construction-popup__date');

      dateEl.querySelectorAll('p')[0].innerHTML = `${date.d}.${date.m}`;
      dateEl.querySelectorAll('p')[1].innerHTML = `${date.y}`;

      monthEl.innerHTML = month;
      slider.forEach((slide, index) => {
        const newSlide = document.createElement('div');
        const newSlideImg = document.createElement('img');
        newSlideImg.src = slide;
        newSlide.classList.add('construction-slider__item');
        newSlide.appendChild(newSlideImg);
        sliderEl.appendChild(newSlide)
      })
    }

		 slickSliderInit() {
      const self = this;
      const $nextSlider = $('.js-construction-slider-next');
      const $prevSlider = $('.js-construction-slider-prev');

      this.$constructionSlider.on("init", (event, slick) => {
        $(".js-construction-current-slide").text(slick.currentSlide + 1);
        $('.js-construction-total-slides').text(`/${slick.slideCount}`)
      });
		
      this.$constructionSlider.on("afterChange", (event, slick, currentSlide) => {
        $(".js-construction-current-slide").text(slick.currentSlide + 1);
        $('.js-construction-total-slides').text(`/${slick.slideCount}`)
      });

      this.$constructionSlider.slick({
        arrows: false
      })

      $nextSlider.on('click', () => {
        self.$constructionSlider.slick('slickNext')
      })

      $prevSlider.on('click', () => {
        self.$constructionSlider.slick('slickPrev')
      })
    }

    init() {
      this.eventListeners();
    }
  }

  createPopupData = new CreatePopupData();
  createPopupData.init();


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
