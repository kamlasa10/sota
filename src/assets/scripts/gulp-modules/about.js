$(document).ready(() => {
  const tl = gsap.timeline({});

  tl.set('.sec1-about__descr', {
    opacity: 0,
    y: 10
  })
    .set('.sec1-about__about', {
      opacity: 0,
      y: 10
    })
    .fromTo('.sec1-about__descr', {
      opacity: 0,
      y: 10
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 1.5
    }, '<')
    .fromTo('.sec1-about__about', {
      opacity: 0,
      y: 10
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      // delay: 1.5
    }, '<')
    .fromTo('.sec1-about__left', {
      backgroundSize: '355px 335px ',
    }, {
      backgroundSize: '395px 373px',
      duration: 1,

    }, '<')

  function aboutValuesOnEnter(item) {
    const tl = gsap.timeline()
    if (item === ".sec3-about__img1") {
      tl.fromTo(item, {
        opacity: 0.4,
        x: 100
      }, {
        opacity: 1,
        x: 55,
        duration: 1
      })
    } else {
      tl.fromTo(item, {
        opacity: 0.4,
        x: 100
      }, {
        opacity: 1,
        x: 0,
        duration: 1
      })
    }
    
    return tl;
  }

  function aboutValuesOnEnterFromRight(item) {
    const tl = gsap.timeline();

    tl.fromTo(item, {
      opacity: 0.4,
      x: -100
    }, {
      opacity: 1,
      x: 0,
      duration: 1
    })
    return tl;
  }

  function aboutValuesSmallImg(item) {
    const tl = gsap.timeline()
    tl.fromTo(item, {
      y: 0
    }, {
      y: -50,
      duration: 3,
    }, 1.5)
    return tl;
  }

  function aboutValuesBigImg(item) {
    const tl = gsap.timeline();
    tl.fromTo(item, {
      y: 0
    }, {
      y: 200
    })
    return tl;
  }

  function textBlockAnim(item) {
    const tl = gsap.timeline();
    tl.fromTo(item, {
      opacity: 0,
      y: 10
    }, {
      opacity: 1,
      y: 0,
      duration: 1
    })
    return tl;
  }

  ScrollTrigger.create({
    trigger: '.sec2-about__img2',
    // end: "+=1000",
    markers: false,
    scrub: true,
    scroller: "[data-scroll-container]",
    // animation: aboutValuesSmallImg('.sec2-about__img2'),
    onEnter: () => {
      aboutValuesOnEnter('.sec2-about__img2')
    }
  });

  ScrollTrigger.create({
    trigger: '.sec2-about__img4',
    // end: "+=1000",
    markers: false,
    scrub: true,
    scroller: "[data-scroll-container]",
    // animation: aboutValuesSmallImg('.sec2-about__img4'),
    onEnter: () => {
      aboutValuesOnEnterFromRight('.sec2-about__img4')
    }
  });

  ScrollTrigger.create({
    trigger: '.sec2-about',
    // end: "+=1000",
    markers: false,
    scrub: true,
    scroller: "[data-scroll-container]",
    animation: aboutValuesBigImg('.sec2-about__img1 img'),
  });

  ScrollTrigger.create({
    trigger: '.sec2-about__img3',
    // end: "+=1000",
    markers: false,
    scrub: true,
    scroller: "[data-scroll-container]",
    animation: aboutValuesBigImg('.sec2-about__img3 img'),
  });

  gsap.utils.toArray('.values-text-block').forEach((item) => {
    ScrollTrigger.create({
      trigger: item,
      // end: "+=1000",
      markers: false,
      scroller: "[data-scroll-container]",
      animation: textBlockAnim(item)
    });
  })


  ScrollTrigger.create({
    trigger: '.sec3-about__img1',
    // end: "+=1000",
    markers: false,
    scroller: "[data-scroll-container]",
    animation: aboutValuesOnEnter('.sec3-about__img1')
  });
  ScrollTrigger.create({
    trigger: '.sec3-about__img2',
    // end: "+=1000",
    markers: false,
    scroller: "[data-scroll-container]",
    animation: aboutValuesOnEnterFromRight('.sec3-about__img2')
  });
});
