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

window.locoScroll.on('scroll', (e) => {
  prevHeight = document.body.scrollHeight
  if (document.body.scrollHeight / 3 <= e.delta.y || e.delta.y < 1000) {
    isEnd = true
  } else {
    isEnd = false
  }
})

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

new ProjectsTabs($('[data-content-choise]'), $('.header-tabs__single-tab-title'), 'active', currentContent)

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

  tl.fromTo($('.projects-start__item--2 .projects-start__item-right img'), {
    y: '20%'
  }, {
    y: 0
  })

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
      scale: 1.3
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
      createScrollTrigger({
        start: '-600',
        end: '+=1600',
        trigger: sec
      }, fn)

      break
    }
    case 'second': {
      createScrollTrigger({
        trigger: sec,
        start: '-700',
      }, fn)
    }

    case 'three': {
      createScrollTrigger({
        trigger: sec,
        start: '-1000',
        end: '+=1000'
      }, fn)
    }

    case 'four': {
      createScrollTrigger({
        trigger: sec,
        start: '-1000',
        end: '+=1100'
      }, fn)
    }

    case 'five': {
      createScrollTrigger({
        trigger: sec,
        start: '-1000',
        end: '+=1100'
      }, fn)
    }

    case 'six': {
      createScrollTrigger({
        trigger: sec,
        start: '-1000',
        end: $(window).width() > 1440 ? '+=1100' : '+=1300'
      }, fn)
    }
  }
})

function createScrollTrigger(opts, fn, scrub = true) {
  ScrollTrigger.create({
    scrub,
    animation: fn(),
    ...opts,
    scroller: "[data-scroll-container]"
  })
}
