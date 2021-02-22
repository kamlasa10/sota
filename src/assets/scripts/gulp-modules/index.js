@@include('./libs.js');

let isPhoneValid 

$('[name=phone]').each(function() {
  $(this).inputmask("38(099)999 99 99",{placeholder:"38(0__)___ __ __", clearMaskOnLostFocus: true})
})

$('.js-burger-btn').on('click', e => {
  $('.nav').toggleClass('nav--show')
})

$('.js-nav__close').on('click', e => {
  $('.nav').removeClass('nav--show')
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
        console.log($(e.currentTarget).val())
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
                          `<div class="field__error-msg field__error-msg--animate">${msgWarnObj[language].warn}</div>`
                      );
                  addIndicateWarnForNode($(this), "field--error", true);
                  isValid = false;
                  return;
              }
              }
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

          if (isValid) {
              const node = document.createElement("div");
              node.classList.add("preloader-overlay", "preloader-spinner");
              event.target.parentNode.append(node);
              sendAjaxForm("static/mail.php", $form);
          }
        })
    })

    function sendAjaxForm(url, selectorForm) {
      const status = {
        sucess: "Спасибо за заявку мы с вами свяжемся в ближайшее время",
        error: "Ошибка на сервере повторите попытку позже",
      };

      $.ajax({
        url: url, //url страницы (action_ajax_form.php)
        type: "POST", //метод отправки
        dataType: "html", //формат данных
        data: $(selectorForm).serialize(), // Сеарилизуем объект
        success: function (response) {
          //Данные отправлены успешно
          $(selectorForm).append(
            `<div class="form__status">${status.sucess}</div>`
          );
          const msg = $(selectorForm).find(".form__status");
          removeNodeByDelay(msg, 5000);
          $(selectorForm)[0].reset();
        },
        error: function (response) {
          // Данные не отправлены
          $(selectorForm).append(
            `<div class="form__status">${status.error}</div>`
          );
          const msg = $(selectorForm).find(".form__status");

          removeNodeByDelay(msg, 5000);
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

  trigger() {
    this.tabs.each((_, item) => {
      $(item).on('click', e => {
        e.preventDefault()

        this.tabs.removeClass(this.activeClass)
        $(item).addClass(this.activeClass)
        this.contentShow($(item).data('choise'))
      })
    })

    this.tabs.removeClass(this.activeClass)
    this.tabs.eq(0).addClass(this.activeClass)
    this.contentShow(1)
  }

  contentShow(value) {
    console.log(value)
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


