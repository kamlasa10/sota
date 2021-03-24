// import i18next from 'i18next';
// import * as yup from 'yup';
// import FormMonster from '../../pug/components/form/form';
// import SexyInput from '../../pug/components/input/input';

/** ******************************* */
/*
 * smooth scroll start
 */

/* eslint-disable-next-line */
window.addEventListener('load', () => {

  let isAppend = false;
  let isLanguageShow = true
  let isTopShowBtn = true

  function scroller(y) {
    
    if($(window).width >= 1025) {
      $('.js-btn-top').css('top', y + 'px')
    }

    if($(window).height() <= y || y >= 1000 && !isTopShowBtn) {
      console.log('bb')
      $('.js-btn-top').fadeIn(200)
      isTopShowBtn = true
    } else if($(window).height() >= y && isTopShowBtn) {
      $('.js-btn-top').fadeOut(200)
      isTopShowBtn = false
    }

    if (y > 300 && isLanguageShow) {
      $('.language').fadeOut(200)
      isLanguageShow = false
    }

    if (y > 0 && !isAppend) {
      // eslint-disable-next-line no-undef
      $('.header').addClass('moving')
      isAppend = true;
    } else if (y <= 0 && isAppend) {
      // eslint-disable-next-line no-undef
      $('.language').fadeIn(200, () => {
        $('.header').removeClass('moving')
        isLanguageShow = true
      })
      isAppend = false;
    }

    if (y > 2000) {
      window.showAnimation = true
      window.countShowWithAnimation = 0
    }

    window.currentPos = y
  }

  $(window).on('resize', () => {
    if ($(window).width() > 1030) {
      window.locoScroll.on('scroll', (e) => {
        scroller(e.delta.y)
      });
    } else {
      window.addEventListener('scroll', () => {
        scroller(document.documentElement.scrollTop)
      })
    }
  }).resize()

  $('.js-btn-top').click(() => {
    if ($(window).width() < 1025) {
      $('html, body').stop().animate({ scrollTop: 0 }, 700)
    } else {
      window.locoScroll.scrollTo(0)
    }
  })
})

/*
 * smooth scroll end
 */
/** ******************************* */
/** ******************************* */
/*
 * form handlers start
 */
// const $form = document.querySelector('[data-home-contact]');

// /* eslint-disable-next-line */
// const formHome = new FormMonster({
//   elements: {
//     $form,
//     $btnSubmit: $form.querySelector('[data-btn-submit]'),
//     fields: {
//       name: {
//         inputWrapper: new SexyInput({ $field: $form.querySelector('[data-field-name]') }),
//         rule: yup
//           .string()
//           .required(i18next.t('required'))
//           .trim(),
//         defaultMessage: i18next.t('name'),
//         valid: false,
//         error: [],
//       },

//       phone: {
//         inputWrapper: new SexyInput({ $field: $form.querySelector('[data-field-phone]') }),
//         rule: yup
//           .string()
//           .matches(/(^[0-9]+$)/, i18next.t('only_number'))
//           .required(i18next.t('required'))
//           .min(6, i18next.t('field_too_short', { cnt: 6 }))
//           .max(15, i18next.t('field_too_long', { cnt: 15 })),

//         defaultMessage: i18next.t('phone'),
//         valid: false,
//         error: [],
//       },
//     },
//   },
// });
/*
 * form handlers end
 */
/** ******************************* */
