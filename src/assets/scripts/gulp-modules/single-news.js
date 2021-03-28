$(window).on('resize', () => {
  if ($(window).width() <= 1200 && $(window).width() >= 480) {
    $('.single-news__similar-item').each((i, item) => {
      if (i > 2) {
        $(item).remove()
      }
    })
  }

  if ($(window).width() <= 480) {
    new Swiper('.js-similar-news', {
      loop: true,
      spaceBetween: 8,
      slidesPerView: 1.25,
      centeredSlides: true,
      allowTouchMove: true,
      noSwiping: false,
      speed: 500,
    })
  }
}).resize()
