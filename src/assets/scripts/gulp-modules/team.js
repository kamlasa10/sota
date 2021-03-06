(function () {
  function offBodyScroll(disabled = false) {
    	if (disabled) {
	    	if (document.documentElement.clientWidth > 1025) {
	    		window.locoScroll.stop()
	    	} else {
	    		$(document.body).css({ overflowY: 'hidden', marginRight: '17px' })
	    	}

	    	return
    	}

    	if (document.documentElement.clientWidth > 1025) {
      window.locoScroll.start()
    	} else {
    		$(document.body).css({ overflowY: 'visible', marginRight: '0' })
    }
  }

  function disabledScroll() {
    	$('.team__info-wrap')[0].addEventListener('mouseenter', () => {
    		const viewHeight = $('.team__info-wrap')[0].getBoundingClientRect().height
    		let isFinished = false
      let prevDirectionScroll = 1

    		offBodyScroll(true)

    		$('.team__info-wrap')[0].addEventListener('wheel', (e) => {
    			const calculateScrolled = viewHeight + e.currentTarget.scrollTop >= e.currentTarget.scrollHeight || !e.currentTarget.scrollTop
    			if (calculateScrolled && prevDirectionScroll === e.deltaY) {
    				isFinished = true
          prevDirectionScroll = e.deltaY

		    		offBodyScroll()
    				return
    			}

    			if (isFinished && !calculateScrolled) {
          prevDirectionScroll = e.deltaY
		    		offBodyScroll(true)
    			}

        prevDirectionScroll = e.deltaY
    		})
      // eslint-disable-next-line no-mixed-spaces-and-tabs
    	})

    	$('.team__info-wrap')[0].addEventListener('mouseleave', () => {
      offBodyScroll()
    })
  }

  if (document.documentElement.clientWidth / 2 - 120 < $('.team__info-wrap')[0].scrollHeight
    	|| (document.body.clientWidth <= 1440 && document.documentElement.clientWidth / 2 - 50 < $('.team__info-wrap')[0].scrollHeight)) {
    disabledScroll()
  }
  disabledScroll()

  $(window).on('resize', (e) => {
    if ($(window).width() <= 1025) {
      $('.team__footer-link').before('<div></div>')
    }

    if ($(window).width() <= 480) {
      new Swiper('.swiper-container', {
        loop: true,
        centeredSlides: true,
        speed: 500,
        allowTouchMove: true,
        noSwiping: false,
        spaceBetween: 15,
        slidesPerView: 1.3,
        breakpoints: {
          320: {
            slidesPerView: 1.3
          },
          350: {
            slidesPerView: 1.3,
            spaceBetween: 10
          }
        },
        on: {
          init(e) {
            e.slides.forEach((item) => {
              $(item).find('.team__content-wrap').hide()
              $(item).find('.team__socials').hide()
            })
            $('.swiper-slide-active').find('.team__content-wrap').show()
            $('.swiper-slide-active').find('.team__socials').show()
          },
          slideChange(e) {
            e.slides.forEach((item) => {
              $(item).find('.team__content-wrap').hide()
              $(item).find('.team__socials').hide()
            })

            if (e.swipeDirection === 'next') {
              $('.swiper-slide-active').next().find('.team__content-wrap').fadeIn(200)
              $('.swiper-slide-active').next().find('.team__socials').fadeIn(200)
            } else {
              $('.swiper-slide-active').prev().find('.team__content-wrap').fadeIn(200)
              $('.swiper-slide-active').prev().find('.team__socials').fadeIn(200)
            }

            // if (Math.ceil(e.slides.length / 2) < e.realIndex) {
            //   $(e.slides[1]).find('.team__content-wrap').fadeIn(200)
            //
            //   return
            // }
            //
            // if (e.previousIndex === 1 && !e.realIndex) {
            //   $(e.slides[1]).find('.team__content-wrap').fadeIn(200)
            //   return;
            // }
            //
            // $(e.slides[e.activeIndex]).find('.team__content-wrap').fadeIn(200)
          }
        }
      })

      $('.socials').css('top', `${$('.team__img').outerHeight()}px`)

      $('.team__item').each(function () {
        $(this).find('.team__content-wrap').append($(this).find('.team__info'))
      })
    }
  }).resize()
}())
