import LocomotiveScroll from 'locomotive-scroll';
// import i18next from 'i18next';
// import * as yup from 'yup';
// import FormMonster from '../../pug/components/form/form';
// import SexyInput from '../../pug/components/input/input';

/** ******************************* */
/*
 * smooth scroll start
 */

document.addEventListener('DOMContentLoaded', () => {
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    smoothMobile: false,
    inertia: 1.1,
  });
  let isAppend = false;
  window.locoScroll = locoScroll

  locoScroll.on('scroll', (e) => {
    if (e.delta.y > 0 && !isAppend) {
      // eslint-disable-next-line no-undef
      $('.language').fadeOut(200, () => {
        $('.header').addClass('moving')
      })
      isAppend = true;
    } else if (e.delta.y <= 0 && isAppend) {
      // eslint-disable-next-line no-undef
      $('.language').fadeIn(200, () => {
        $('.header').removeClass('moving')
      })
      isAppend = false;
    }
  });

  $('.js-btn-top').click(() => {
    if ($(window).width() < 1025) {
      $(document.body).stop().animate({ scrollTop: 0 }, 700)
    } else {
      locoScroll.scrollTo(0)
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
