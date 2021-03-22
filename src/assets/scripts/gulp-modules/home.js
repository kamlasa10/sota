let isFirst = true
const startChangeSlide = () => {
  setTimeout(() => {
    $('.main__progress-wrap').find('.main__progress-img img').attr('src', src)
  }, 200)
}

let src
const tl = gsap.timeline({ onStart: startChangeSlide })

function setPreviewNextSlide(nextSlide, current, isAnimateText = true) {
  console.log(nextSlide.find('.main__item-bg').css('background-image'))
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
    console.log(window.showAnimation)
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

let scrollTriggerIntance

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
          '92%'
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
        delay: 2,
        duration: 8.4,
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
            duration: 10.5,
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

  if ($(window).width() <= 1370) {
    offsetImg = '-29%'
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
    }, 0)
    .fromTo('.choise-us__item--1-right', {
      y: 100
    }, {
      y: 0
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

// window.addEventListener("load", () => {
//   // set up our WebGL context and append the canvas to our wrapper
//   const curtains = new Curtains({
//       container: "canvas",
//       watchScroll: false, // no need to listen for the scroll in this example
//       pixelRatio: Math.min(1.5, window.devicePixelRatio) // limit pixel ratio for performance
//   });

//   // get our plane element
//   const planeElements = document.getElementsByClassName("main__item");

//   // here we will handle which texture is visible and the timer to transition between images
//   const slideshowState = {
//       activeTextureIndex: 1,
//       nextTextureIndex: 2, // does not care for now
//       maxTextures: planeElements[0].querySelector("img").length - 1, // -1 because displacement image does not count

//       isChanging: false,
//       transitionTimer: 0,
//   };

//   // handling errors
//   curtains.onError(() => {
//       // we will add a class to the document body to display original images
//       document.body.classList.add("no-curtains", "image-1");

//       // handle simple slides management here
//       planeElements[0].addEventListener("click", () => {
//           if(slideshowState.activeTextureIndex < slideshowState.maxTextures) {
//               slideshowState.nextTextureIndex = slideshowState.activeTextureIndex + 1;
//           }
//           else {
//               slideshowState.nextTextureIndex = 1;
//           }

//           document.body.classList.remove("image-1", "image-2", "image-3", "image-4");
//           document.body.classList.add("image-" + slideshowState.nextTextureIndex);

//           slideshowState.activeTextureIndex = slideshowState.nextTextureIndex;

//       });
//   }).onContextLost(() => {
//       // on context lost, try to restore the context
//       curtains.restoreContext();
//   });

//   // disable drawing for now
//   curtains.disableDrawing();

//   const vs = `
//       precision mediump float;
//       // default mandatory variables
//       attribute vec3 aVertexPosition;
//       attribute vec2 aTextureCoord;
//       uniform mat4 uMVMatrix;
//       uniform mat4 uPMatrix;
//       // varyings : notice we've got 3 texture coords varyings
//       // one for the displacement texture
//       // one for our visible texture
//       // and one for the upcoming texture
//       varying vec3 vVertexPosition;
//       varying vec2 vTextureCoord;
//       varying vec2 vActiveTextureCoord;
//       varying vec2 vNextTextureCoord;
//       // textures matrices
//       uniform mat4 activeTexMatrix;
//       uniform mat4 nextTexMatrix;
//       // custom uniforms
//       uniform float uTransitionTimer;
//       void main() {
//           gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
//           // varyings
//           vTextureCoord = aTextureCoord;
//           vActiveTextureCoord = (activeTexMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
//           vNextTextureCoord = (nextTexMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
//           vVertexPosition = aVertexPosition;
//       }
//   `;

//   const fs = `
//       precision mediump float;
//       varying vec3 vVertexPosition;
//       varying vec2 vTextureCoord;
//       varying vec2 vActiveTextureCoord;
//       varying vec2 vNextTextureCoord;
//       // custom uniforms
//       uniform float uTransitionTimer;
//       // our textures samplers
//       // notice how it matches the sampler attributes of the textures we created dynamically
//       uniform sampler2D activeTex;
//       uniform sampler2D nextTex;
//       uniform sampler2D displacement;
//       void main() {
//           // our displacement texture
//           vec4 displacementTexture = texture2D(displacement, vTextureCoord);
//           // slides transitions based on displacement and transition timer
//           vec2 firstDisplacementCoords = vActiveTextureCoord + displacementTexture.r * ((cos((uTransitionTimer + 90.0) / (90.0 / 3.141592)) + 1.0) / 1.25);
//           vec4 firstDistortedColor = texture2D(activeTex, vec2(vActiveTextureCoord.x, firstDisplacementCoords.y));
//           // same as above but we substract the effect
//           vec2 secondDisplacementCoords = vNextTextureCoord - displacementTexture.r * ((cos(uTransitionTimer / (90.0 / 3.141592)) + 1.0) / 1.25);
//           vec4 secondDistortedColor = texture2D(nextTex, vec2(vNextTextureCoord.x, secondDisplacementCoords.y));
//           // mix both texture
//           vec4 finalColor = mix(firstDistortedColor, secondDistortedColor, 1.0 - ((cos(uTransitionTimer / (90.0 / 3.141592)) + 1.0) / 2.0));
//           // handling premultiplied alpha
//           finalColor = vec4(finalColor.rgb * finalColor.a, finalColor.a);
//           gl_FragColor = finalColor;
//       }
//   `;

//   // some basic parameters
//   const params = {
//       vertexShader: vs,
//       fragmentShader: fs,
//       uniforms: {
//           transitionTimer: {
//               name: "uTransitionTimer",
//               type: "1f",
//               value: 0,
//           },
//       },
//   };

//   const multiTexturesPlane = new Plane(curtains, planeElements[0], params);

//   multiTexturesPlane.onLoading((texture) => {
//       // improve texture rendering on small screens with LINEAR_MIPMAP_NEAREST minFilter
//       texture.setMinFilter(curtains.gl.LINEAR_MIPMAP_NEAREST);
//   }).onReady(() => {
//       // the idea here is to create two additionnal textures
//       // the first one will contain our visible image
//       // the second one will contain our entering (next) image
//       // that way we will deal with only activeTex and nextTex samplers in the fragment shader
//       // and we could easily add more images in the slideshow...

//       // first we set our very first image as the active texture
//       const activeTex = multiTexturesPlane.createTexture({
//           sampler: "activeTex",
//           fromTexture: multiTexturesPlane.textures[slideshowState.activeTextureIndex]
//       });
//       // next we set the second image as next texture but this is not mandatory
//       // as we will reset the next texture on slide change
//       const nextTex = multiTexturesPlane.createTexture({
//           sampler: "nextTex",
//           fromTexture: multiTexturesPlane.textures[slideshowState.nextTextureIndex]
//       });

//       planeElements[0].addEventListener("click", () => {
//           if(!slideshowState.isChanging) {
//               // enable drawing for now
//               curtains.enableDrawing();

//               slideshowState.isChanging = true;

//               // check what will be next image
//               if(slideshowState.activeTextureIndex < slideshowState.maxTextures) {
//                   slideshowState.nextTextureIndex = slideshowState.activeTextureIndex + 1;
//               }
//               else {
//                   slideshowState.nextTextureIndex = 1;
//               }
//               // apply it to our next texture
//               nextTex.setSource(multiTexturesPlane.images[slideshowState.nextTextureIndex]);

//               setTimeout(() => {
//                   // disable drawing now that the transition is over
//                   curtains.disableDrawing();

//                   slideshowState.isChanging = false;
//                   slideshowState.activeTextureIndex = slideshowState.nextTextureIndex;
//                   // our next texture becomes our active texture
//                   activeTex.setSource(multiTexturesPlane.images[slideshowState.activeTextureIndex]);
//                   // reset timer
//                   slideshowState.transitionTimer = 0;

//               }, 1700); // add a bit of margin to the timer
//           }

//       });

//   }).onRender(() => {
//       // increase or decrease our timer based on the active texture value
//       if(slideshowState.isChanging) {
//           // use damping to smoothen transition
//           slideshowState.transitionTimer += (90 - slideshowState.transitionTimer) * 0.04;

//           // force end of animation as damping is slower the closer we get from the end value
//           if(slideshowState.transitionTimer >= 88.5 && slideshowState.transitionTimer !== 90) {
//               slideshowState.transitionTimer = 90;
//           }
//       }

//       // update our transition timer uniform
//       multiTexturesPlane.uniforms.transitionTimer.value = slideshowState.transitionTimer;
//   });
// });
