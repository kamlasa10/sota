@@include('./libs.js');

let isPhoneValid 
let isMenuShow = false

$('[name=phone]').each(function() {
  $(this).inputmask("38(099)999 99 99",{placeholder:"38(0__)___ __ __", clearMaskOnLostFocus: true})
})

$('.js-burger-btn').on('click', e => {
  $('.nav').toggleClass('nav--show')
})

$('.js-nav__close').on('click', e => {
  $('.nav').removeClass('nav--show')
})

$('.js-popup-close').on('click', e => {
  e.preventDefault()

  $('.overlay').removeClass('overlay--show')
  setTimeout(() => {
    $('.popup').hide()
  }, 400)
})

$('.js-popup-btn').on('click', e => {
  $('.js-popup').hide()
  const popupName = $(e.currentTarget).data().openPopup

  $(`[data-popup=${popupName}]`).show()
  
  $('.overlay').addClass('overlay--show')
})

$(document)[0].addEventListener('click', e => {
  const path = e.path || (e.composedPath && e.composedPath());

  if(e.target.classList.contains('overlay')) {
    $('.overlay').removeClass('overlay--show')
  }
})

$(document).ready(() => {
  (function() {
    $('.contacts-select__list').on('click', e => {
      if($(e.target).hasClass('contacts-select__item')) {
        const value = $(e.target).text()
        const idx = $(e.currentTarget).data().contactsList

        $(e.currentTarget).children().removeClass('contacts-select__item--selected')
        $(e.target).addClass('contacts-select__item--selected')
        
        $(`[data-select-current=${idx}]`).text(value)
      }
    })

    $('[type=radio]').each(function() {
      $(this).on('change', e => {
        $('[type=radio]').each(function() {
          $(this).attr('checked', false)
        })
        $(e.currentTarget).attr('checked', true)
      })
    })
  })()

  function removeFormTextWarn(input) {
    input.parent().find(".field__error-msg").remove();
  }
  
  function removeAllFormTextWarn(inputs) {
    inputs.each(function() {
        $(this).parent().find(".field__error-msg").remove();
    });
  }
  
  function addIndicateWarnForNode(node, classes, isAdded = true) {
    if (isAdded) {
        $(node).closest(".field").addClass(classes);
        return;
    }
  
    $(node).closest(".field").removeClass(classes);
  }
  
  function removeNodeByDelay(node, delay) {
    setTimeout(() => {
        node.remove();
    }, delay);
  }
  
  (function() {
    const msgWarnObj = {
        ua: {
            email: 'Введіть коректний Email',
            phone: 'Введіть коректний номер телефону',
            warn: "Це поле обов'язкове"
        },
        ru: {
            email: 'Введите корректный Email',
            phone: 'Введите корректный номер телефона',
            warn: 'Это поле обязательное'
        },
        en: {
            email: 'Enter a valid Email',
            phone: 'Enter the correct phone number',
            warn: 'field is required'
        }
    }
    const language = document.body.dataset.language
  
    function checkEmail(str) {
        const re = /\S+@\S+\.\S+/;
        return re.test(str);
    }

    function checkNumbers(str) {
      return str.replace(/[\W_]+/g, '')
    }
  
    function validateForm(inputs) {
        let isValid = true;
        inputs.each(function() {
            $(this).on("input", (e) => {
              if(this.dataset.required) {
                if (
                  $(e.target).attr("name") === "email" &&
                  !checkEmail($(e.target).val())
              ) {
                  removeFormTextWarn($(this));
                  $(this)
                      .parent()
                      .append(
                          `<div class="field__error-msg">${msgWarnObj[language].email}</div>`
                      );
                  addIndicateWarnForNode($(this), "field--error", true);
                  isValid = false;
                  return;
              }

              if (
                  $(e.target).attr("name") === "phone" &&
                  checkNumbers(this.value).length < 12
              ) {
                  removeFormTextWarn($(this));
                  $(this)
                      .parent()
                      .append(
                          `<div class="field__error-msg">${msgWarnObj[language].phone}</div>`
                      );
                  addIndicateWarnForNode($(this), "field--error", true);
                  isValid = false;
                  return;
              }

              if ($(e.target).val().replace(/\s+/g, "")) {
                  removeFormTextWarn($(this));
                  addIndicateWarnForNode($(this), "field--error", false);
                  isValid = false;
                  return;
              } else {
                  removeFormTextWarn($(this));
                  $(this)
                      .parent()
                      .append(
                          `<div class="field__error-msg">${msgWarnObj[language].warn}</div>`
                      );
                  addIndicateWarnForNode($(this), "field--error", true);
                  isValid = false;
                  return;
              }
              }

              $('.field__error-msg').addClass('field__error-msg--animate')
            });
  
            if (!$(this).val().replace(/\s+/g, "") && $(this)[0].type !== 'hidden' && this.dataset.required) {
                removeFormTextWarn($(this));
                $(this)
                    .parent()
                    .append(
                        `<div class="field__error-msg field__error-msg--animate">${msgWarnObj[language].warn}</div>`
                    );
                addIndicateWarnForNode($(this), "field--error", true);
                isValid = false;
            }
        });
  
        return isValid;
    }
  
    try {
        $('[name="file"]').on("change", (e) => {
            const { name } = e.target.files[0];
            const idx = e.currentTarget.dataset.inputFile

            $(`[data-contacts-file=${idx}]`).find('span').text(name)
        });
    } catch (e) {}
  
    $('[data-form]').each(function() {
        this.addEventListener('submit', e => {
          e.preventDefault()
          $form = $(this)
        
          const inputs = $form
              .find($("[name]"))
              .not(".g-recaptcha-response")
              .not("iframe");
          const isValid = validateForm(inputs);

          if($form.data().form === 'single-vacancy' && !$('.popup-contacts__item-file span').text()) {
            return
          }

          if (isValid) {
              sendAjaxForm("static/mail.php", $form);
          }
        })
    })

    function sendAjaxForm(url, selectorForm) {
      let processData = true;
      let contentType = "application/x-www-form-urlencoded";

      let data = new FormData();
      let $input = $("#file");

      if(selectorForm.find('[type=file]').prop('files') !== undefined) {
        
      }
      
      $.each($(selectorForm)[0], function(key, value) {

        if($(value).attr('name') === 'file' && value.files !== undefined) {
          data.append('file', value.files[0])
          return
        } else if($(value).attr('name') === 'contact') {
          if($(value).attr('checked')) {
            data.append('contactBy', $(value).val())
          }
          return
        }

        data.append($(value).attr("name"), $(value).val() || '');
    });

      data.append("action", "application");
      contentType = processData = false;

      selectorForm.find('button[type=submit]').css('pointer-events', 'none')

      $.ajax({
        url: url, //url страницы (action_ajax_form.php)
        type: "POST", //метод отправки
        processData: processData,
        contentType: contentType,
        data: data, // Сеарилизуем объект
        success: function (response) {
          //Данные отправлены успешно
            selectorForm.find('button[type=submit]').css('pointer-events', 'initial')
            $('.popup').hide()
            $('[data-popup="thank"]').show()
            $('.overlay').addClass('overlay--show')
            $(selectorForm)[0].reset();
        },
        error: function (response) {
          // Данные не отправлены
          $(selectorForm)[0].reset();
        },
      });
    }
  })()
})

class Tabs {
  constructor(content, tabs, activeClass) {
    this.content = content
    this.tabs = tabs
    this.activeClass = activeClass
    this.init()
  }

  trigger(fn) {
    this.tabs.each((_, item) => {
      $(item).on('click', e => {
        e.preventDefault()

        this.tabs.removeClass(this.activeClass)
        $(item).addClass(this.activeClass)
        this.contentShow($(item).data('choise'))
        
        fn($(item))
      })
    })

    this.tabs.removeClass(this.activeClass)
    this.tabs.eq(0).addClass(this.activeClass)
    this.contentShow(1)
  }

  contentShow(value) {
    this.content.hide()
    this.content.each((_, item) => {
      if ($(item).data('content-choise') === value) {
        $(item).fadeIn(200)
      }
    })
  }

  init() {
    this.trigger()
  }
}


