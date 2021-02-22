function setPreviewNextSlide(nextSlide, current) {
  const src = nextSlide.find('.main__item-bg').css('background-image')
    .slice(5, nextSlide.find('.main__item-bg').css('background-image')
      .length - 2)
  current.find('.main__progress-img').attr('src', src)
}

(function () {
  new Tabs($('[data-content-choise]'),
    $('.js-choise-tab'), 'choise-us__tab--active')

  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 50.461714448701464, lng: 30.496371456088845 },
    zoom: 14,
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
    icon: '../dist/assets/images/maps/home.svg'
  });
}())

const swiper = new Swiper('.js-main__wrap', {
  pagination: {
    el: '.main__progress-bar',
    type: 'progressbar',
  },
  loop: true,
  slidesPerView: 1,
  on: {
    init(e) {
      setPreviewNextSlide($(e.slides[e.activeIndex + 1]), $(e.slides[e.activeIndex]))

      $('.main__progress-current').text('/01')
      $('.main__progress-total').text(`0${e.slides.length / 2}`)
    },
    slideChange(e) {
      try {
        if (e.slides.length / 2 < e.snapIndex) {
          setPreviewNextSlide($(e.slides[2]), $(e.slides[1]))
          $('.main__progress-current').text('/ 01')

          return
        }

        if (e.previousIndex === 1 && !e.activeIndex) {
          setPreviewNextSlide($(e.slides[1]), $(e.slides[e.slides.length / 2]))
          $('.main__progress-current').text(`/ 0${e.slides.length / 2}`)

          return;
        }
      } catch (e) {}
      setPreviewNextSlide($(e.slides[e.activeIndex + 1]), $(e.slides[e.activeIndex]))
      $('.main__progress-current').text(`/0${e.activeIndex}`)
    },
  },
})
