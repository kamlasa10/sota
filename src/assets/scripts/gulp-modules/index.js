@@include('./libs.js');
@@include('../modules/vacancy/vacancyLoadingLogic.js');

class SetCountPortion {
    constructor(nodes, page, countShowNodePerStep) {
        this.nodes = Array.from(document.querySelectorAll(nodes))
        this.page = page
        this.countShowNodePerStep = countShowNodePerStep
        this.init()
    }

    createObjWithTypePortion() {
       return this.nodes.reduce((acc, next) => {
            const type = next.dataset.stepType

            acc[type] = acc[type] || []
            acc[type].push(next)

            return acc
        }, {})
    }

    init() {
        const ObjOfArrNodes = this.createObjWithTypePortion()

        Object.values(ObjOfArrNodes).forEach(arr => {
            let count = 0
            let portionStep = 1

            arr.forEach(node => {
                if(count < this.countShowNodePerStep) {
                    node.setAttribute('data-portion', portionStep)
                    count++
                } else {
                    count = 0
                    ++portionStep
                    node.setAttribute('data-portion', portionStep)
                    count++
                }
            })
        })
    }
}

let isPhoneValid
let isMenuShow = false

if($(window).width() >= 1024) {
  $('.js-btn-top').css('top', ($(window).height() - 200) + 'px')
}

setTimeout(() => {
  const tl = gsap.timeline()
  let offsetX = 450

  if($(window).width() <= 1025) {
    offsetX = 200
  }

  if($(window).width() <= 480) {
    offsetX = 110
  }

  tl.to('.preloader__mask', {
    duration: 1.2,
    stagger: 0.3,
    y: '-100%'
  })
  tl.to('.bg-for-finish-animate', {
    duration: 1.5,
    x: '100%',
    ease: Power1.ease
   }, 1.4).to('#Preloader', {
    duration: 1.1,
    x: offsetX
  }, 1.4)
  .to('.preloader-bg', {
    duration: 0.8,
    opacity: 0,
    zIndex: -100
  }, 1.8)
  .to('#Preloader', {
    opacity: 0,
    zIndex: -100
  }, 1.6)
  .fromTo('.header', {
    y: '-80',
    opacity: 0
  }, {
    opacity: 1,
    y: 0,
    duration: 1.3
  }, 1)
  .fromTo('.socials', {
    y: 50,
    opacity: 0
  }, {
    y: 0,
    duration: 1.3,
    opacity: 1
  }, 1.7)


 }, 100)

$('[name=phone]').each(function() {
    $(this).inputmask("38(099)999 99 99", { placeholder: "38(0__)___ __ __", clearMaskOnLostFocus: true })
})

$('.js-burger-btn').on('click', e => {
    $('.nav').toggleClass('nav--show')

    if($(window).width() > 480) {
        const coord = $('.js-burger-btn')[0].getBoundingClientRect()

        $('.js-nav__close').css({
            top: coord.y + 5,
            left: coord.x + 5
        })
    }
})

$(window).resize(() => {
    if($(window).width() > 480) {
        const coord = $('.js-burger-btn')[0].getBoundingClientRect()

        $('.js-nav__close').css({
            top: coord.y + 5,
            left: coord.x + 5
        })
    }
}).trigger('resize')

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

if($(window).width() > 1025) {
    window.locoScroll = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true,
        smoothMobile: false,
        inertia: 1.1
    });

    window.locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("[data-scroll-container]", {
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
        pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}

$(document)[0].addEventListener('click', e => {
    const path = e.path || (e.composedPath && e.composedPath());

    if (e.target.classList.contains('overlay')) {
        $('.overlay').removeClass('overlay--show')
        $('.header').removeClass('show')
    }
})

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
        const language = $('html').attr('lang')
        console.log(language)

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
                        sendAjaxForm("/wp-admin/admin-ajax.php", $form);
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

                if(value.tagName.toLowerCase() === 'input' || value.tagName.toLowerCase() === 'textarea') {
                    data.append($(value).attr("name"), $(value).val() || '');
                }
            });

            data.append("action", "application");
            contentType = processData = false;

            selectorForm.find('button[type=submit]').css('pointer-events', 'none')

            $(`[data-contacts-file] span`).text('Файл не вибрано')
            $('.status-request').show()

            try {
                if($('.contacts-select__current').text()) {
                    data.append('choiseSelect', $('.contacts-select__current').text())
                }
            } catch(e) {}


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
                    console.log($(`[data-popup=${selectorForm.data().successType}]`))
                    $(`[data-popup=${selectorForm.data().successType}]`).show()
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
    constructor(content, tabs, activeClass, showedTabInit = 1) {
        this.content = content
        this.tabs = tabs
        this.activeClass = activeClass
        this.showedTabInit = showedTabInit
        this.init()
    }

    trigger(fn, idxFirstShowTab = 0) {
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
        this.tabs.eq(idxFirstShowTab).addClass(this.activeClass)
        this.contentShow(this.showedTabInit)
    }

    contentShow(value) {
        this.content.hide()
        this.content.each((_, item) => {
            if ($(item).data('content-choise') == value) {
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

class TabChange {
    constructor(tabClass, tabBtnClass, tabWrapperClass) {
      this.tabBtnClass = tabBtnClass;
      this.tabClass = tabClass;
      this.tabWrapperClass = tabWrapperClass
    }

    removeClass(array, className) {
      array.forEach((item, _) => {
        item.classList.remove(className);
      })
    }

    setTabHeight(activeTab, container) {
      const activeTabItem = document.querySelector(activeTab);
      const containerItem = document.querySelector(container);
      const tabHeight = activeTabItem.offsetHeight;
      containerItem.style.height = `${tabHeight}px`;
      window.locoScroll.update();
    }

    tabSwitch(tabClass, btnClass, containerClass) {
      const self = this;
      const tabBtns = document.querySelectorAll(btnClass);
      const tabs = document.querySelectorAll(tabClass);

      tabBtns.forEach((btn, _) => {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          self.removeClass(tabBtns, 'active');
          self.removeClass(tabs, 'active');
          this.classList.add('active');
          const activeHref = this.getAttribute('href');
          const activeTab = document.querySelector(`[data-tab="${activeHref}"]`);
          activeTab.classList.add('active');
          self.setTabHeight(`${tabClass}.active`, containerClass)
          window.locoScroll.update();
        })
      })
    }

    init() {
      this.setTabHeight(`${this.tabClass}.active`, this.tabWrapperClass)
      this.tabSwitch(this.tabClass, this.tabBtnClass, this.tabWrapperClass)
    }
  }

  // adaptive
  $(window).on('resize', () => {
    if($(window).width() <= 920) {
        $('.language__current').append($('.language__link--current'))
        $('.language__list-dropdown').append($('.language__link:not(.language__link--current)'))
    } else {
        $('.header__language').append($('.language__link'))
    }
  }).resize()


// animate
