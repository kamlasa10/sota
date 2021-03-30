function firstSec() {
  const tl = gsap.timeline()

  // tl.fromTo('.financial__intro-left img', {
  //   scale: 1.2
  // }, {
  //   scale: 1,
  //   duration: 1
  // }, 1.7)
  //   .fromTo('.financial__intro-title', {
  //     opacity: 0,
  //     y: -30
  //   }, {
  //     opacity: 1,
  //     y: 0,
  //     duration: 1
  //   }, 1.9)
  //   .fromTo('.financial__intro-right-block', {
  //     y: 30,
  //     opacity: 0
  //   }, {
  //     y: 0,
  //     opacity: 1,
  //     duration: 1
  //   }, 1.9)
  //   .fromTo('.financial__intro-right img', {
  //     y: 100,
  //     scale: 1.1
  //   }, {
  //     y: 0,
  //     scale: 1,
  //     duration: 1
  //   }, 1.85)

  tl.fromTo('.financial__intro-left', {
    y: 0,
  }, {
    y: '15%'
  })
  .fromTo('.financial__intro-left img', {
    scale: 1
  }, {
    scale: 1.125
  }, 0)

  return tl
}

function secondSec() {
  const tl = gsap.timeline()

  tl.fromTo('.financial__step-item--animate', {
    opacity: 0,
    y: -30,
  }, {
    stagger: 0.3,
    y: 0,
    opacity: 1,
    duration: 1.4
  })
    .fromTo('.financial__step-item::after', {
      height: 0
    }, {
      duration: 1,
      height: '100%'
    }, 0)

  return tl
}

function threeSec() {
  const tl = gsap.timeline()

  tl.fromTo('.financial__info-right', {
    y: '-50',
    opacity: 0
  }, {
    duration: 1,
    y: 0,
    opacity: 1
  })
  .fromTo('.financial__info-left', {
    y: 50,
    opacity: 0
  }, {
    duration: 1,
    opacity: 1,
    y: 0
  }, 0)
  .fromTo('.financial__intro-right img', {
    
  })

  return tl
}

const animateObj = {
  first: firstSec,
  second: secondSec,
  three: threeSec
}

gsap.utils.toArray('[data-section]').forEach((sec) => {
  const animationName = $(sec).data().section
  const fn = animateObj[animationName]

  switch (animationName) {
    case 'first': {
      createScrollTrigger({
        trigger: sec,
        end: '+=1500'
      }, fn, true)
      break
    }

    case 'second': {
      createScrollTrigger({
        trigger: sec,
        start: '-=500'
      }, fn, false)
      break
    }

    case 'three': {
      createScrollTrigger({
        trigger: sec,
        start: '-700',
      }, fn, false)
      break
    }
  }
})

function createScrollTrigger(opts, fn, scrub = true) {
  ScrollTrigger.create({
    scrub,
    animation: fn(),
    ...opts,
    scroller: $(window).width() >= 1025 ? "[data-scroll-container]" : ''
  })
}

// adaptive

$(window).on('resize', () => {
  if ($(window).width() <= 940) {
    $('.js-financial-container').append($('.financial__intro-title'))
  }

  if ($(window).width() <= 480) {
    $('.financial__step-item').each((_, item) => {
      $(item).append($(item).find('.financial__step-item-desc'))
    })
  } else {
    $('.financial__step-item').each((_, item) => {
      $(item).find('.financial__step-item-top-content')
        .append($(item).find('.financial__step-item-desc'))
    })
  }
}).resize()
