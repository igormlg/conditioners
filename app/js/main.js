
// форма conditioner-form
// const getItBtn = document.querySelector('#get-it-btn');
// const dataCall = {}
// if (getItBtn) {
//     getItBtn.addEventListener('click', function (event) {
//         event.preventDefault();
//         const zipCode = document.querySelector('input[name=zip]')
//         const zipCodeValue = zipCode.value;

//         if (zipCodeValue === '') {
//             return;
//         }
        
//         dataCall.zip = zipCode.value
//         axios('/php-scripts/telegram-send.php')
//             .then(function (response) {
//             console.log(response);
//         });
        // fetch('/php-scripts/telegram-send.php', {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        // })
        // .then((response) => {
        //     // console.log(response, 'resp')
        //     return response.json();
        // })
        // .then((data) => {
        //     console.log(data)
        // })
        // .catch((er) => {
        //     console.log(er, 'ee')
        // })
//     })
// }

const headerBrg = document.querySelector('.header-brg');
const headerMenu = document.querySelector('.header-title-menu');
const modalOverlay = document.querySelector('.modal-overlay');
const headerCall = document.querySelector('.header-call');
const callbackMenu = document.querySelector('.callback-menu');
const cbBtn = document.querySelectorAll('.cb-btn');
const bodyEl = document.body;
const deskCloseMenu = document.querySelector('.desktop-close-menu');

// события по нажатию на бургер
headerBrg.addEventListener('click', function() {
    if (callbackMenu.classList.contains('callback-menu--show')) {
        callbackMenu.classList.remove('callback-menu--show')
        headerBrg.classList.remove('header-brg--active');
        modalOverlay.classList.remove('modal-overlay--callback-show');
        headerCall.classList.remove('header-call--overlayed');
        bodyEl.classList.remove('body-fixed')

        if (headerMenu.classList.contains('header-title-menu--active')) {
            headerMenu.classList.remove('header-title-menu--active');
            modalOverlay.classList.remove('modal-overlay--show');
        }
        return;
    }
    headerBrg.classList.toggle('header-brg--active');
    headerMenu.classList.toggle('header-title-menu--active');
    modalOverlay.classList.toggle('modal-overlay--show');
    headerCall.classList.toggle('header-call--overlayed');

    bodyEl.classList.toggle('body-fixed');
});

// события по нажатию esc если модальные окна открыты
window.onkeydown = function(event) {
    if (event.keyCode == 27 && headerMenu.classList.contains('header-title-menu--active')) {
        event.preventDefault();
        headerBrg.classList.remove('header-brg--active');
        headerMenu.classList.remove('header-title-menu--active');
        modalOverlay.classList.remove('modal-overlay--show');
        bodyEl.classList.remove('body-fixed');
        deskCloseMenu.classList.remove('desktop-close-menu--show');
        headerCall.classList.remove('header-call--overlayed');
    } 
    if (event.keyCode == 27 && callbackMenu.classList.contains('callback-menu--show')) {
        event.preventDefault();
        callbackMenu.classList.remove('callback-menu--show');
        headerBrg.classList.remove('header-brg--active');
        modalOverlay.classList.remove('modal-overlay--callback-show');
        headerCall.classList.remove('header-call--overlayed');
        bodyEl.classList.remove('body-fixed');
        deskCloseMenu.classList.remove('desktop-close-menu--show');
        removeErrs();
    }
};

// установка событий по нажатию кнопок Call me back 
for (let e = 0; e < cbBtn.length; e++) {
    cbBtn[e].addEventListener('click', function() {
        callbackMenu.classList.add('callback-menu--show')
        headerBrg.classList.add('header-brg--active');
        modalOverlay.classList.add('modal-overlay--callback-show');
        headerCall.classList.add('header-call--overlayed');
        bodyEl.classList.add('body-fixed');

        if (window.screen.width >= 768) {
            deskCloseMenu.classList.add('desktop-close-menu--show');
        }
    });
}

// slider
function sliderStart(slider) {
    let countS = 0;
    let widthS;
    const imagesS = slider.querySelectorAll('.slider .slider-img');
    const sliderLine = slider.querySelector('.slider-line');

    function initSlider() {
        widthS = slider.querySelector('.slider').offsetWidth;
        sliderLine.style.width = widthS * imagesS.length + 'px';

        imagesS.forEach(item => {
            item.style.width = widthS + 'px';
            item.style.height = 'auto';
        });
        rollSlider();
    }
    
    function rollSlider() {
        sliderLine.style.transform = 'translate(-' + countS * widthS + 'px)';
    }
    
    window.addEventListener('resize', initSlider)
    initSlider();
    
    slider.querySelector('.slider-next').addEventListener('click', function() {
        countS++;
        if (countS >= imagesS.length) {
            countS = imagesS.length - 1;
            return;
        }
        rollSlider();
    });
    
    slider.querySelector('.slider-prev').addEventListener('click', function() {
        countS--;
        if (countS < 0) {
            countS = 0;
            return;
        }
        rollSlider();
    });
}

for (let el of document.querySelectorAll('.slider-block')) {
    if (el.classList.contains('slider-block--reviews') && window.screen.width > 1280) {
        continue;
    }
    sliderStart(el);
}
// inputmask for phone
let telInput = document.querySelectorAll('input[type="tel"]')
let im = new Inputmask("(999) 999 - 99 - 99", { showMaskOnHover: false });

if (telInput) {
    im.mask(telInput)
}

// отмена всплытия для блоков
document.querySelector('.call-check').addEventListener('click', function(event) {
    event.stopPropagation();
}); 
document.querySelector('.call-tel').addEventListener('click', function(event) {
    event.stopPropagation();
}); 

// обработка событий на кнопке формы call-block
const callBtn = document.querySelector('.call-btn');
if (callBtn) {
    callBtn.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        const callBlockPhone = document.querySelector('.call-tel');
        const callCheckInput = document.querySelector('#call-check__input');
        const callCheckLabel = document.querySelector('.call-check label');

        function inputListener(event) {
            callBlockPhone.classList.remove('call-tel-wrong');
        }

        callCheckLabel.addEventListener('click', function() {
            if (callCheckLabel.classList.contains('call-tel-wrong')) {
                callCheckLabel.classList.remove('call-tel-wrong');
            }
        });

        if (callBlockPhone.inputmask) {
            const unmaskedPhone = callBlockPhone.inputmask.unmaskedvalue();

            if (unmaskedPhone.length !== 10) {

                callBlockPhone.addEventListener('input', inputListener); 
                callBlockPhone.classList.add('call-tel-wrong'); 

                if (callBlockPhone.classList.contains('call-tel-wrong')) {
                    callBlockPhone.classList.remove('call-tel-wrong');
                    window.setTimeout(() => {
                        callBlockPhone.classList.add('call-tel-wrong');
                      }, 50);
                }
            } else if (!callCheckInput.checked) {
                if (callCheckLabel.classList.contains('call-tel-wrong')) {
                    callCheckLabel.classList.remove('call-tel-wrong');
                    window.setTimeout(() => {
                        callCheckLabel.classList.add('call-tel-wrong');
                    });
                } else {
                    callCheckLabel.classList.add('call-tel-wrong');
                }
            } else {
                callBlockPhone.removeEventListener('input', inputListener);
                const transformNumber = (callBlockPhone.value).split(' ').join('')
                const confBlock = document.querySelector('.confirm-block');
                const confBlockText = confBlock.querySelector('.confirm-block__text');
                axios({
                    method: 'post',
                    url: '/php-scripts/telegram-send.php',
                    data: {
                      phone: transformNumber,
                      form: 'call-block-form'
                    }
                })
                .then(function(response) {
                    if (response.data.status === 'ok') {
                        confBlockText.textContent = 'Thanks! We\'ll call you back soon';
                    } else {
                        const erMsg = response.data.messages_error;
                        confBlockText.textContent = erMsg;
                    }
                })
                .catch(function(er) {
                    console.log(er)
                    confBlockText.textContent = 'Something went wrong!';
                })
                .finally(function() {
                    confBlock.classList.add('confirm-block--active');
                    callBlockPhone.value = '';
                });
            }
        }
    });
}

// обработка событий на кнопке callback-form__submit

const callbackFormSubmit = document.querySelector('.callback-form__submit');

let reqSubmit = false;
let phoneCheck = false;
let nameCheck = false;
let locationCheck = false;

const firstName = document.querySelector('#first-name');
const stateSelect = document.querySelector('#state-select2');
const callbackTel = document.querySelector('#callback-tel');
const dayPartGroup = document.querySelectorAll('input[name="day-part-group"]');
let dayPartChecked = null;

const nameErr = document.querySelector('.name-err');
const stateErr = document.querySelector('.state-err');
const callTelErr = document.querySelector('.phone-err');
const timeErr = document.querySelector('.time-err');

function inputNameListener() {
    firstName.classList.remove('callback-form__text-input-err');
    nameErr.classList.remove('name-err--show');
    nameCheck = firstName.value;
}
function changeStateSelect() {
    stateSelect.classList.remove('callback-form__text-input-err');
    stateErr.classList.remove('state-err--show');
    locationCheck = stateSelect.value;
}

function timeRadioListener() {
    timeErr.classList.remove('time-err--show');
}

function inputcallbackTelListener() {
    unmaskedcallbackTel = callbackTel.inputmask.unmaskedvalue();

    if (unmaskedcallbackTel.length === 10) {
        phoneCheck = unmaskedcallbackTel;
        callbackTel.classList.remove('callback-form__text-input-err');
        callTelErr.classList.remove('phone-err--show');
    }
}

// функция закрытия ошибок
function removeErrs() {
    document.querySelector('.name-err').classList.remove('name-err--show');
    document.querySelector('.state-err').classList.remove('state-err--show');
    document.querySelector('.phone-err').classList.remove('phone-err--show');
    document.querySelector('.time-err').classList.remove('time-err--show');
    document.querySelectorAll('.callback-form__text-input').forEach(function(el){
        el.classList.remove('callback-form__text-input-err');
        el.value = '';
    });
    document.querySelector('#state-select2').value = 'Location';
    if (document.querySelector('input[name="day-part-group"]:checked')) {
        document.querySelector('input[name="day-part-group"]:checked').checked = false;
    }
}

if (callbackFormSubmit) {
    callbackFormSubmit.addEventListener('click', function(event) {
        event.preventDefault();
        dayPartChecked = document.querySelector('input[name="day-part-group"]:checked');

        if (firstName.value === '') {
            firstName.classList.add('callback-form__text-input-err');
            nameErr.classList.add('name-err--show');
            nameCheck = false;
            firstName.addEventListener('input', inputNameListener);
        } else {
            nameCheck = firstName.value;
        }
        
        if (stateSelect.value === 'Location') {
            stateSelect.classList.add('callback-form__text-input-err');
            stateErr.classList.add('state-err--show');
            stateSelect.addEventListener('change', changeStateSelect);
            locationCheck = false;
        } else {
            locationCheck = stateSelect.value;
        }

        if (callbackTel.inputmask) {
            let unmaskedcallbackTel = callbackTel.inputmask.unmaskedvalue();
            if (unmaskedcallbackTel.length !== 10) {

                callbackTel.addEventListener('input', inputcallbackTelListener);
                callbackTel.classList.add('callback-form__text-input-err');
                callTelErr.classList.add('phone-err--show');
                phoneCheck = false;
            } else {
                phoneCheck = unmaskedcallbackTel;
            }
        }

        if (dayPartChecked) {
            if (timeErr.classList.contains('time-err--show')) {
                timeErr.classList.remove('time-err--show');
            }
        } else {
            timeErr.classList.add('time-err--show');

            for (let r = 0; r < dayPartGroup.length; r++) {
                dayPartGroup[r].addEventListener('click', timeRadioListener);
            }
        }
        console.log(dayPartChecked, 'dayPartChecked')
        console.log(phoneCheck ,'phoneCheck')
        console.log(nameCheck, 'nameCheck')
        console.log(locationCheck, 'locationCheck')
        if (dayPartChecked && phoneCheck && nameCheck && locationCheck) {
            console.log('FULL')
            const data = {
                form: 'callback-form',
                phone: '+' + phoneCheck,
                name: nameCheck,
                location: locationCheck,
                when: dayPartChecked.value
            }
            console.log(data)

            axios({
                method: 'post',
                url: '/php-scripts/telegram-send.php',
                data: data
            })
            .then(function (response) {
                console.log(response.data)
                if (response.data.status === 'ok') {

                } else {
                    
                }
            })
            .catch(function(er) {
                console.log(er)
            })
            .finally(function() {
                dayPartChecked.checked = false;
                callbackTel.value = '';
                firstName.value = '';
                stateSelect.value = 'Location';
                callbackMenu.classList.remove('callback-menu--show');
                modalOverlay.classList.remove('modal-overlay--callback-show');
                bodyEl.classList.remove('body-fixed');
                headerBrg.classList.remove('header-brg--active');
                deskCloseMenu.classList.remove('desktop-close-menu--show');
                headerCall.classList.remove('header-call--overlayed');
            })
        }
    });
}

// показ блоков faq
const faqBtn = document.querySelectorAll('.faq-block__item');
if (faqBtn.length) {

    for (let el of faqBtn) {
        el.addEventListener('click', function() {
            el.querySelector('.faq-block__btn').classList.toggle('faq-block__btn--active');
            el.querySelector('.faq-block__answer').classList.toggle('faq-block__answer--show');
        });
    }
}

// скролл до блока cleaning по нажатию на why-scroll
const whyScrollAll = document.querySelectorAll('.why-scroll');
let userAgentString = navigator.userAgent;

if (whyScrollAll.length) {
    for (let el of whyScrollAll) {
        el.addEventListener('click', function(event) {
            event.preventDefault();
            const cleaningBlock = document.querySelector('.el-to-scroll');
            
            if (cleaningBlock) {
                headerMenu.classList.remove('header-title-menu--active');
                modalOverlay.classList.remove('modal-overlay--show');
                headerBrg.classList.remove('header-brg--active');
                headerCall.classList.remove('header-call--overlayed');
                bodyEl.classList.remove('body-fixed');
                el.blur();
                
                setTimeout(function() {
                    const rect = cleaningBlock.getBoundingClientRect();
                    window.scroll({ top: rect.y, left: 0, behavior: 'smooth' });
                }, 100)
            }
        });
    }
}

// закрытие модального окна на десктопе
deskCloseMenu.addEventListener('click', function() {
    modalOverlay.classList.remove('modal-overlay--show');
    modalOverlay.classList.remove('modal-overlay--callback-show');
    callbackMenu.classList.remove('callback-menu--show');
    bodyEl.classList.remove('body-fixed');
    deskCloseMenu.classList.remove('desktop-close-menu--show');

    // закрытие ошибок
    removeErrs();
});

// закрытие модального окна на десктопе по нажатию на оверлей
modalOverlay.addEventListener('click', function(event) {
    modalOverlay.classList.remove('modal-overlay--show');
    modalOverlay.classList.remove('modal-overlay--callback-show');
    callbackMenu.classList.remove('callback-menu--show');
    bodyEl.classList.remove('body-fixed');
    headerCall.classList.remove('header-call--overlayed');
    deskCloseMenu.classList.remove('desktop-close-menu--show');

    // закрытие ошибок
    removeErrs();

});

// закрытие окна уведомления
const confirmBlock = document.querySelector('.confirm-block');
confirmBlock.addEventListener('click', function() {
    confirmBlock.classList.add('confirm-block--close');
    setTimeout(function() {
        confirmBlock.classList.remove('confirm-block--active');
        confirmBlock.classList.remove('confirm-block--close');
;    }, 500)
});

// закрытие всех предупреждений по нажатию на body
document.addEventListener('click', function(event) {
    if (document.querySelector('.call-tel')) {
        if (document.querySelector('.call-tel').classList.contains('call-tel-wrong')) {
            document.querySelector('.call-tel').classList.remove('call-tel-wrong');
        }
        document.querySelector('.call-tel').value = '';
    }
    if (document.querySelector('.call-check label')) {
        if (document.querySelector('.call-check label').classList.contains('call-tel-wrong')) {
            document.querySelector('.call-check label').classList.remove('call-tel-wrong');
        }
    }
});