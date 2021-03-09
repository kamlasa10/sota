@@include('./libs.js');

let isPhoneValid
let isMenuShow = false

var __FinishPreload = (function () {
  var l = document.getElementById("Preloader_waveContainer"),
    n = 285,
    r = -30,
    e = 0.9,
    t = null,
    a = !1,
    i = setInterval(o, 20 / 60);
  function o() {
    if (n <= r) {
      clearInterval(i);
      n = r;
      a = 1;
      t && t();
    } else n -= e;
    l.style.transform = "translate(0, " + n + "px)";
  }
  return function (r) {
    if (a) return r();
    e = 1;
    var l = setInterval(function () {
      if (n > 30) e *= 0.7;
    }, 100 / 30);
    t = function () {
      clearInterval(l);
      r();
    };
  };
})();

setTimeout(() => {
  const tl = gsap.timeline()

  tl.to('.bg-for-finish-animate', {
    duration: 1.5,
    x: '100%'
  }).to('#Preloader', {
    duration: 1.1,
    x: 450
  }, 0.2)
  .to('.preloader-bg', {
    duration: 0.8,
    opacity: 0,
    zIndex: -100
  }, 1)
  .to('#Preloader', {
    opacity: 0,
    zIndex: -100
  }, 0.8)


}, 1800)


$('[name=phone]').each(function() {
    $(this).inputmask("38(099)999 99 99", { placeholder: "38(0__)___ __ __", clearMaskOnLostFocus: true })
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
    $('.header').removeClass('show')
    setTimeout(() => {
        $('.popup').hide()
    }, 400)
})

$('.js-popup-btn').on('click', e => {
    $('.js-popup').hide()
    const popupName = $(e.currentTarget).data().openPopup

    $(`[data-popup=${popupName}]`).show()

    $('.overlay').addClass('overlay--show')

    $('.header').addClass('show')
})

$(document)[0].addEventListener('click', e => {
    const path = e.path || (e.composedPath && e.composedPath());

    if (e.target.classList.contains('overlay')) {
        $('.overlay').removeClass('overlay--show')
        $('.header').removeClass('show')
    }
})

window.locoScroll = new LocomotiveScroll({
    el: document.querySelector(".js-scroll-container"),
    smooth: true,
    smoothMobile: false,
    inertia: 1.1
});

window.locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(".js-scroll-container", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
        };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".js-scroll-container").style.transform ? "transform" : "fixed"
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

$(document).ready(() => {
    (function() {
        $('.status-request').hide()

        $('.contacts-select__list').on('click', e => {
            if ($(e.target).hasClass('contacts-select__item')) {
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

        function setTextByFileName(idx, name) {
            $(`[data-contacts-file=${idx}]`).find('span').text(name)
            $(`[data-contacts-file=${idx}]`).data().value = true
        }

        try {
            $('[name="file"]').on("change", (e) => {
                const { name } = e.target.files[0];
                const idx = e.currentTarget.dataset.inputFile
                const avaliablesFormats = ['pdf, docs']
                const reg = "\.(doc|pdf)$"
                const hasValue = name.toLowerCase().match(reg)

                if (idx == 2) {
                    hasValue && setTextByFileName(idx, name)
                    hasValue && $('.popup-contacts__item-file').removeClass('error')
                    return
                }

                setTextByFileName(idx, name)
            });
        } catch (e) {}

        (function() {
            let isFirstShowWarn = true

            function validateForm(inputs) {
                let isValid = true;
                inputs.each(function() {
                    $(this).on("input", (e) => {
                        if (this.dataset.required) {
                            if (
                                $(e.target).attr("name") === "email" &&
                                !checkEmail($(e.target).val())
                            ) {
                                removeFormTextWarn($(this));
                                $(this)
                                    .parent()
                                    .append(
                                        `<div class="field__error-msg field__error-msg--animate">${msgWarnObj[language].email}</div>`
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
                                        `<div class="field__error-msg field__error-msg--animate">${msgWarnObj[language].phone}</div>`
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
                    console.log($('[data-value]')[0])
                    if ($(this).attr('type') === 'file' &&
                        $('[data-value]')[0] && $('[data-value]').data().value === false) {
                        $('.popup-contacts__item-file').addClass('error')
                        isValid = false
                    }

                    if (!$(this).val().replace(/\s+/g, "") && $(this)[0].type !== 'hidden' && this.dataset.required) {
                        removeFormTextWarn($(this))

                        if (!isFirstShowWarn) {
                            $(this)
                                .parent()
                                .append(
                                    `<div class="field__error-msg field__error-msg--animate">${msgWarnObj[language].warn}</div>`
                                )
                            addIndicateWarnForNode($(this), "field--error", true)
                            isValid = false
                            return
                        }

                        $(this)
                            .parent()
                            .append(
                                `<div class="field__error-msg">${msgWarnObj[language].warn}</div>`
                            )
                        addIndicateWarnForNode($(this), "field--error", true)
                        isValid = false;
                    }
                })
                setTimeout(() => {
                    if (isFirstShowWarn) {
                        $('.field__error-msg').addClass('field__error-msg--animate')
                        isFirstShowWarn = false
                    }
                }, 50)

                return isValid;
            }

            $('[data-form]').each(function() {
                this.addEventListener('submit', e => {
                    e.preventDefault()
                    $form = $(this)

                    const inputs = $form
                        .find($("[name]"))
                        .not(".g-recaptcha-response")
                        .not("iframe");
                    const isValid = validateForm(inputs, isFirstShowWarn);

                    if ($form.data().form === 'single-vacancy' && !$('.popup-contacts__item-file span').text()) {
                        return
                    }

                    if (isValid) {
                        sendAjaxForm("static/mail.php", $form);
                    }
                })
            })
        })()

        function sendAjaxForm(url, selectorForm) {
            let processData = true;
            let contentType = "application/x-www-form-urlencoded";

            let data = new FormData();
            let $input = $("#file");

            if (selectorForm.find('[type=file]').prop('files') !== undefined) {

            }

            $.each($(selectorForm)[0], function(key, value) {

                if ($(value).attr('name') === 'file' && value.files !== undefined) {
                    data.append('file', value.files[0])
                    return
                } else if ($(value).attr('name') === 'contact') {
                    if ($(value).attr('checked')) {
                        data.append('contactBy', $(value).val())
                    }
                    return
                }

                data.append($(value).attr("name"), $(value).val() || '');
            });

            data.append("action", "application");
            contentType = processData = false;

            selectorForm.find('button[type=submit]').css('pointer-events', 'none')

            $(`[data-contacts-file] span`).text('')
            $('.status-request').show()

            $.ajax({
                url: url, //url страницы (action_ajax_form.php)
                type: "POST", //метод отправки
                processData: processData,
                contentType: contentType,
                data: data, // Сеарилизуем объект
                success: function(response) {
                    //Данные отправлены успешно
                    selectorForm.find('button[type=submit]').css('pointer-events', 'initial')
                    $('.popup').hide()
                    $('[data-popup="thank"]').show()
                    $('.overlay').addClass('overlay--show')
                    $('.status-request').hide()
                    $(selectorForm)[0].reset();
                },
                error: function(response) {
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

        try {
            window.locoScroll.update()
        } catch (e) {}
    }

    init() {
        this.trigger()
    }
}

// animate
