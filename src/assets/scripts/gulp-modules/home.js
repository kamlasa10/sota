$(document).ready(() => {
  if ($(window).width() <= 650) {
    const swiper = new Swiper('.js-contacts-slider', {
      speed: 500,
      allowTouchMove: true,
      noSwiping: false,
      slidesPerView: 1,
      on: {
        init(e) {
          if (e.activeIndex === 0) {
            $('.js-project__prev').attr('disabled', true).addClass('disabled')
          }
        },
        slideChange(e) {
          $('.project__arrow').removeClass('disabled').attr('disabled', false)

          if (e.activeIndex === 0) {
            $('.js-project__prev').attr('disabled', true).addClass('disabled')
            return
          }

          if (e.activeIndex === e.slides.length - 1) {
            $('.js-project__next').attr('disabled', true).addClass('disabled')
          }
        }
      }
    })
  
    $('.js-project__prev').on('click', (e) => {
      e.preventDefault()
  
      swiper.slidePrev(500)
    })
  
    $('.js-project__next').on('click', (e) => {
      e.preventDefault()
      console.log('click')
  
      swiper.slideNext(500)
    })
  }
})


let isFirst = true
const startChangeSlide = () => {
  setTimeout(() => {
    $('.main__progress-wrap').find('.main__progress-img img').attr('src', src)
  }, 200)
}

let src
const tl = gsap.timeline({ onStart: startChangeSlide })

function setPreviewNextSlide(nextSlide, current, isAnimateText = true) {
  src = nextSlide.find('.main__item-bg').css('background-image')
    .slice(5, nextSlide.find('.main__item-bg').css('background-image')
      .length - 2)
  if (!isFirst) {
    gsap.to('.main__progress-img', { opacity: 0, x: 50 })
    setTimeout(() => {
      $('.main__progress-img img').attr('src', src)
    }, 300)

    setTimeout(() => {
      gsap.to('.main__progress-img', { opacity: 1, x: 0 })
    }, 900)
    if (isAnimateText || window.showAnimation) {
      const tl = gsap.timeline()

      tl
        .fromTo(current.find('.main__small-title'), {
          duration: 1, y: -35, opacity: 0, delay: 0.4
        }, { duration: 1, opacity: 1, y: 0 }, '<0.2')
        .fromTo(current.find('.main__title'), { duration: 1, y: 30, opacity: 0 }, { duration: 1, opacity: 1, y: 0 }, 0.9)
        .fromTo(current.find('.main__desc'), { duration: 1, y: 40, opacity: 0 }, { duration: 1, opacity: 1, y: 0 }, '<0.2')

      return
    }

    setTimeout(() => {
      gsap.fromTo('.main__item-wrap', {
        scale: 0.6,
      }, {
        scale: 1,
        duration: 1.3,
      })
    }, 150)
  }

  setTimeout(() => {
    $('.main__progress-wrap').find('.main__progress-img').attr('src', src)
  }, 200)

  isFirst = false
}

(function () {
  function animateTabs(node) {
    const tabName = node.data().choise
    const tl = gsap.timeline()

    switch (tabName) {
      case 1: {
        tl.fromTo('.choise-us__item--1-img img', {
          width: '0%'
        }, {
          x: $(window).width() <= 1025 ? '30px' : '',
          duration: 0.8,
          width: $(window).width() > 1440 ? '80%' : '77%'
        }, 0.6)
          .fromTo('.choise-us__item--1-right', {
            opacity: 0,
            x: 100
          }, {
            duration: 1,
            opacity: 1,
            x: 0
          }, '<0.3')
          .fromTo('.choise-us__item--1-left .bg', {
            y: 80,
            opacity: 0
          }, {
            y: 0,
            duration: 1.2,
            opacity: 1
          }, 0)

        break
      }
      case 2: {
        tl.fromTo('.choise-us__item--2-right', {
          x: '30%',
          opacity: 0
        }, {
          x: '0',
          opacity: 1,
          duration: 1
        })
          .fromTo('.choise-us__item--2-content', {
            y: 50,
            opacity: 0
          }, {
            y: 0,
            opacity: 1,
            duration: 1
          }, 0)

        break
      }
      case 3: {
        let imgHeight = '100%'

        if ($(window).width() <= 1440 && $(window).width() > 1370) {
          imgHeight = '97%'
        } else if ($(window).width <= 1370) {
          imgHeight = '92%'
        }

        tl.fromTo('.choise-us__item--3-small-title', {
          y: -30,
          opacity: 0
        }, {
          y: 0,
          duration: 1,
          opacity: 1
        })
          .fromTo('.choise-us__item--3-img', {
            height: '85%'
          }, {
            height: imgHeight,
            duration: 1
          }, 0.3)
          .fromTo('.choise-us__item--3-title', {
            y: 30,
            opacity: 0
          }, {
            y: 0,
            opacity: 1,
            duration: 1
          }, 0.3)
          .fromTo('.choise-us__item--3-list', {
            y: 60,
            opacity: 0
          }, {
            opacity: 1,
            y: 0,
            duration: 1
          }, 0.6)
      }
    }

    ScrollTrigger.refresh()
  }

  class TabsWithAnimation extends Tabs {
    constructor(...data) {
      super(...data)
    }

    trigger() {
      super.trigger(animateTabs)
    }
  }
  new TabsWithAnimation($('[data-content-choise]'),
    $('.js-choise-tab'), 'choise-us__tab--active')

  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 50.461714448701464, lng: 30.496371456088845 },
    zoom: 15,
    disableDefaultUI: true,
    styles: [
      {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "saturation": 36
          },
          {
            "color": "#333333"
          },
          {
            "lightness": 40
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "color": "#ffffff"
          },
          {
            "lightness": 16
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#fefefe"
          },
          {
            "lightness": 20
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#fefefe"
          },
          {
            "lightness": 17
          },
          {
            "weight": 1.2
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          },
          {
            "lightness": 20
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          },
          {
            "lightness": 21
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dedede"
          },
          {
            "lightness": 21
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#ffffff"
          },
          {
            "lightness": 17
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#ffffff"
          },
          {
            "lightness": 29
          },
          {
            "weight": 0.2
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          },
          {
            "lightness": 18
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          },
          {
            "lightness": 16
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f2f2f2"
          },
          {
            "lightness": 19
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e9e9e9"
          },
          {
            "lightness": 17
          }
        ]
      }
    ]
  })

  new google.maps.Marker({
    position: { lat: 50.461714448701464, lng: 30.496371456088845 },
    map,
    icon: '../wp-content/themes/sota/assets/images/maps/home.svg'
  });
}())

$("#map").on("wheel mousewheel DOMMouseScroll", (e) => {
  e.preventDefault();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Control') {
    window.locoScroll.stop();
  }
});
document.addEventListener('keyup', (e) => {
  if (e.key === 'Control') {
    window.locoScroll.start();
  }
});

let myTl
let sliderFlag = true
window.countShowWithAnimation = 0

const swiper = new Swiper('.js-main__wrap', {
  autoplay: {
    delay: 10000,
    disableOnInteraction: false,
  },
  loop: true,
  slidesPerView: 1,
  speed: 800,
  on: {
    init(e) {
      setTimeout(() => {
        setPreviewNextSlide($(e.slides[e.activeIndex + 1]), $(e.slides[e.activeIndex]))
      }, 800)
      myTl = gsap.fromTo('.main__progress-bar-indicator', {
        width: 0
      }, {
        delay: 2.4,
        duration: 8,
        width: '100%'
      })
      $('.main__progress-current').text('01/')
      $('.main__progress-total').text(`0${Math.ceil(e.slides.length / 2)}`)
    },
    slideChange(e) {
      if (!sliderFlag) {
        myTl.pause()
        $('.main__progress-bar-indicator').css('width', 0)

        setTimeout(() => {
          myTl.pause()
          $('.main__progress-bar-indicator').css('width', 0)

          myTl = gsap.fromTo('.main__progress-bar-indicator', {
            width: 0
          }, {
            duration: 10.6,
            width: '100%'
          })
        }, 800)
      }
      try {
        if (currentPos <= 400 && window.showAnimation) {
          ++window.countShowWithAnimation
          setTimeout(() => {
            window.showAnimation = false
          }, 10000)

          if (window.countShowWithAnimation > 1) {
            window.showAnimation = false
          }
        }

        if (Math.ceil(e.slides.length / 2) < e.snapIndex) {
          setPreviewNextSlide($(e.slides[2]), $(e.slides[e.activeIndex]), false)
          $('.main__progress-current').text('01/')

          return
        }

        if (e.previousIndex === 1 && !e.activeIndex) {
          setPreviewNextSlide($(e.slides[1]), $(e.slides[e.activeIndex]), false)
          $('.main__progress-current').text(`0${Math.ceil(e.slides.length / 2)}/`)

          return;
        }
      } catch (e) {}
      setPreviewNextSlide($(e.slides[e.activeIndex + 1]), $(e.slides[e.activeIndex]), false)
      $('.main__progress-current').text(`0${e.activeIndex}/`)

      sliderFlag = false
    },
  },
})

$('.main__progress-img').click(() => {
  swiper.slideNext()
})

gsap.from('.socials', {
  duration: 1.4,
  y: 35,
  opacity: 0,
})

function choiseSec() {
  const tl = gsap.timeline()

  let offsetImg = '-32%'
  let offsetX = '140'

  if ($(window).width() <= 1370) {
    offsetImg = '-29%'
  }

  if ($(window).width <= 1025) {
    offsetImg = '-27%'
  }

  if ($(window).width() <= 850 && $(window).width() >= 770) {
    offsetImg = '-9%'
    offsetX = '90'
  }

  if ($(window).width() < 770) {
    offsetImg = '-9%'
    offsetX = '50'
  }

  tl.fromTo('.title', {
    y: -30,
  }, {
    y: 0,
  }, 0)
    .fromTo('.choise-us__tab', {
      y: 30,
    }, {
      y: 0,
    }, 0).fromTo('.choise-us__item--1-img', {
      y: '15%'
    }, {
      y: offsetImg,
      x: offsetX
    }, 0)
    .fromTo('.choise-us__item--1-right', {
      y: 100
    }, {
      y: 0,
    }, 0)
    .fromTo('.choise-us__item--1-left .bg', {
      y: 150,
    }, {
      y: 0,
    }, 0)
    .fromTo('.choise-us__content', {
      y: 80
    }, {
      y: 0
    }, 0)

  return tl
}

function projectSec() {
  const tl = gsap.timeline()
  let imgOffset = '-47%'

  if ($(window).width() <= 1370) {
    imgOffset = '-41%'
  }

  if ($(window).width() <= 1025) {
    imgOffset = '-26%'
  }

  if ($(window).width() <= 770) {
    imgOffset = '-67%'
  }

  tl.fromTo('.project__content-left', {
    y: 70
  }, {
    y: 0
  })
    .fromTo('.project__content-right', {
      y: $(window).width() <= 1440 ? '-18%' : '-13%'
    }, {
      y: imgOffset
    }, 0)
    .fromTo('.project__content-right img', {
      backgroundPosition: '-50% -50%'
    }, {
      backgroundPosition: '0 0'
    }, 0)
    .fromTo('.project__list', {
      y: 100,
    }, {
      y: 0
    })

  return tl
}

function contactsSec() {
  const tl = gsap.timeline()

  tl.fromTo('.contacts__bg', {
    y: 250,
  }, {
    y: 0,
  }, 0.075)
    .fromTo('.contacts__small-title', {
      y: -20,
    }, {
      y: 0,
    }, 0)
    .fromTo('.contacts__title', {
      y: 30,
    }, {
      y: 0,
    }, 0)
    .fromTo('.contacts__list', {
      y: 50,
    }, {
      y: 0,
    }, 0)
    .fromTo('.contacts__block', {
      y: 80,
    }, {
      y: 0,
    }, 0)
    .fromTo('.contacts__map', {
      y: '50%'
    }, {
      y: 0
    }, 0)

  return tl
}

const objWithFnAnimation = {
  choise: choiseSec,
  project: projectSec,
  contacts: contactsSec
}


gsap.utils.toArray('[data-section]').forEach((item) => {
  const sectionName = $(item).data().section
  const fn = objWithFnAnimation[sectionName]

  let offsetPattern = '+=1800'

  if ($(window).width() <= 1440) {
    offsetPattern = '+=1200'
  }

  if ($(window).width() <= 1370) {
    offsetPattern = '+=1200'
  }

  if ($(item).data().section === 'project') {
    ScrollTriggerInstance = ScrollTrigger.create({
      trigger: item,
      // end: "+=1000",
      scrub: sectionName === 'project',
      scroller: "[data-scroll-container]",
      animation: fn(),
      end: sectionName === 'project' ? offsetPattern : ''
    });

    return
  }

  let offsetContacts = '+=1300'

  if ($(window).width() <= 1440) {
    offsetContacts = '+=1100'
  }

  if (sectionName === 'choise') {
    ScrollTrigger.create({
      trigger: item,
      end: $(window).height() + 100,
      scrub: true,
      scroller: "[data-scroll-container]",
      animation: fn(),
    });

    return
  }

  ScrollTrigger.create({
    trigger: item,
    end: `+=${$(window).height() / 1}`,
    scrub: true,
    scroller: "[data-scroll-container]",
    animation: fn(),
  });
})

// adaptive 
