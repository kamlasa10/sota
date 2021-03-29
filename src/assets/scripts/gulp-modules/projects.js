const idxElem = window.location.hash.split('#')[1]
let activeTab = $(`[data-tab-filter=${idxElem}]`).index() === -1 ? 0 : $(`[data-tab-filter=${idxElem}]`).index()

const currentContent = activeTab >= 1 ? 2 : 1
let isEnd = false
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' && $(e.target).attr('href').split('#')[1]) {
    const filterName = $(e.target).attr('href').split('#')[1]

    activeTab = $(`[data-tab-filter=${filterName}]`).index()
    $(`[data-tab-filter=${filterName}]`).trigger('click')

    if (isEnd) {
      setTimeout(() => {
        window.locoScroll.scrollTo('.page__inner')
      }, 500)
    }
  }
})

let prevHeightBody

if ($(window).width() >= 1025) {
  window.locoScroll.on('scroll', (e) => {
    prevHeight = document.body.scrollHeight
    if (document.body.scrollHeight / 3 <= e.delta.y || e.delta.y < 1000) {
      isEnd = true
    } else {
      isEnd = false
    }
  })
}

if ($(window).width() <= 1024) {
  document.addEventListener('scroll', () => {
    prevHeight = document.body.scrollHeight
    if (document.body.scrollHeight / 3 <= document.documentElement.scrollTop
      || document.documentElement.scrollTop < 1000) {
      isEnd = true
    } else {
      isEnd = false
    }
  })
}

new SetCountPortion('.projects__item', null, 6)

class ProjectsTabs extends Tabs {
  constructor(content, tabs, activeClass, firstShow) {
    super(content, tabs, activeClass, firstShow)
  }

  onTabChange(activeTab) {
    if (activeTab.data().tabFilter) {
      const filterName = activeTab.data().tabFilter

      $(`[data-filter]`).each(function () {
        $(this).data().filter === filterName ? $(this).fadeIn(200) : $(this).hide()
      })
      new VacancyProgress($(`[data-filter=${filterName}]`))
    }

    window.locoScroll.update()
  }

  trigger() {
    super.trigger(this.onTabChange, activeTab)
  }
}

new ProjectsTabs($('[data-content-choise]'), $('.js-projects-tab'), 'active', currentContent)

if (activeTab > 0) {
  $(`[data-tab-filter=${idxElem}]`).trigger('click')
}

function firstSec() {
  const tl = gsap.timeline()

  tl.fromTo('.projects-start__top-left', {
    y: 20
  }, {
    y: 0,
    duration: 1
  })
    .fromTo('.projects-start__top-right', {
      y: 20
    }, {
      y: 0,
      duration: 1
    }, 0)
    .fromTo('.projects-start__top-img-bottom', {
      y: '15%',
    }, {
      y: '-27%',
    }, 0)
    .fromTo('.projects-start__top-img-bottom img', {
      scale: 1.3
    }, {
      scale: 1
    }, 0)

  if($(window).width() <= 800) {
    tl.fromTo('.projects-start__top-bottom', {
      y: 43
    }, {
      y: 0
    }, 0)
  }

  return tl
}

function secondSec() {
  const tl = gsap.timeline()

  tl.fromTo('.projects-start__item-left-content', {
    y: 30
  }, {
    y: 0
  })
    .fromTo('.projects-start__item-right-content', {
      y: 30
    }, {
      y: 0
    }, 0)

  return tl
}

function threeSec() {
  const tl = gsap.timeline()
  const width = $(window).width()

  if(width > 1024) {
    tl.fromTo($('.projects-start__item--2 .projects-start__item-right img'), {
      y: '20%'
    }, {
      y: 0
    })
  }

  if(width <= 1024) {
    tl.fromTo($('.projects-start__item--2 .projects-start__item-right img'), {
      y: '15%'
    }, {
      y: 0
    })
  }
  
  return tl
}

function fourSec() {
  const tl = gsap.timeline()

  tl.fromTo('.projects-start__item--3', {
    y: 80
  }, {
    y: 0
  })

  return tl
}

function fiveSec() {
  const tl = gsap.timeline()
  let offseTop = '-7%'

  if ($(window).width() <= 1440 && $(window).width() >= 1370) {
    offseTop = '-6%'
  } else if ($(window).width() < 1370) {
    offseTop = '-5%'
  }

  tl.fromTo('.projects-start__item-left', {
    y: '8%'
  }, {
    y: offseTop
  })
    .fromTo('.projects-start__item-left img', {
      scale: $(window).width() > 1025 ? 1.3 : 1
    }, {
      scale: 1
    }, 0)
    .fromTo($('.projects-start__item--4 .projects-start__item--right-content'), {
      y: 80
    }, {
      y: 0
    }, 0)

  return tl
}

function sixSec() {
  const tl = gsap.timeline()

  tl.fromTo($('.projects-start__item--6 img'), {
    y: '21%'
  }, {
    y: 0
  })
    .fromTo($('.projects-start__item--6 .projects-start__content'), {
      y: 80
    }, {
      y: 0
    }, 0)

  return tl
}

const animateObj = {
  first: firstSec,
  second: secondSec,
  three: threeSec,
  four: fourSec,
  five: fiveSec,
  six: sixSec
}

gsap.utils.toArray('[data-section]').forEach((sec) => {
  const animationName = $(sec).data().section
  const fn = animateObj[animationName]

  switch (animationName) {
    case 'first': {

      if($(window).width() > 800) {  
        createScrollTrigger({
          start: '-600',
          end: '+=1600',
          trigger: sec
        }, fn)
      }

      if($(window).width() <= 800) {
        createScrollTrigger({
          start: '-600',
          end: '+=1000',
          trigger: sec
        }, fn)
      }

      break
    }
    case 'second': {
      createScrollTrigger({
        trigger: sec,
        start: '-700',
      }, fn)
    }

    case 'three': {
      if($(window).width() <= 1025) {
        createScrollTrigger({
          trigger: sec,
          start: '-800',
          end: '+=750'
        }, fn)
      } else {
        createScrollTrigger({
          trigger: sec,
          start: '-1000',
          end: '+=1000'
        }, fn)
      }
    }

    case 'four': {
      createScrollTrigger({
        trigger: sec,
        start: '-1000',
        end: '+=1100'
      }, fn)
    }

    case 'five': {

      if($(window).width() > 1025) {
        createScrollTrigger({
          trigger: sec,
          start: '-1000',
          end: '+=1100'
        }, fn)
      }

      if($(window).width() < 1025 && $(window).width() > 770) {
        createScrollTrigger({
          trigger: sec,
          start: '-800',
          end: '+=800'
        }, fn)
      }

      if($(window).width() < 770) {
        createScrollTrigger({
          trigger: sec,
          start: '-1000',
          end: '+=1000'
        }, fn)
      }
    }

    case 'six': {
      if($(window).width() >= 770) {   
        createScrollTrigger({
          trigger: sec,
          start: '-1000',
          end: $(window).width() > 1440 ? '+=1100' : '+=1300'
        }, fn)
      }

      if($(window).width() < 770) {
        createScrollTrigger({
          trigger: sec,
          start: '-1000',
          end: '+=950'
        }, fn)
      }
    }
  }
})

function createScrollTrigger(opts, fn, scrub = true) {
  ScrollTrigger.create({
    scrub,
    animation: fn(),
    ...opts,
    scroller: $(window).width() > 1025 ? "[data-scroll-container]" : ''
  })
}

$(window).on('resize', () => {
  if($(window).width() <= 805) {
    $('.projects-start__top-bottom').append($('.js-projects-start__top-desc'))
  } else {
    $('.projects-start__top-content').append($('.js-projects-start__top-desc'))
  }

  if($(window).width() <= 905) {
    $('.projects-start__item--2 .projects-start__item-left-content').before($('.projects-start__item--1 .projects-start__item-left-content'))
  }

  if($(window).width() <= 770) {
    $('.projects-start__item--6 .container').append($('.projects-start__item--6 .projects-start__text--full'))
  }
})
