
// форма conditioner-form
const getItBtn = document.querySelector('#get-it-btn');
const dataCall = {}
if (getItBtn) {
    getItBtn.addEventListener('click', function (event) {
        event.preventDefault();
        const zipCode = document.querySelector('input[name=zip]')
        const zipCodeValue = zipCode.value;

        if (zipCodeValue === '') {
            return;
        }
        
        dataCall.zip = zipCode.value
        axios('/php-scripts/telegram-send.php')
            .then(function (response) {
            console.log(response);
        });
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
    })
}

const headerBrg = document.querySelector('.header-brg');
const headerMenu = document.querySelector('.header-title-menu');
const modalOverlay = document.querySelector('.modal-overlay');
const headerCall = document.querySelector('.header-call');
const callbackMenu = document.querySelector('.callback-menu');
const cbBtn = document.querySelectorAll('.cb-btn');
const bodyEl = document.body;

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
        bodyEl.classList.remove('body-fixed')
    } 
    if (event.keyCode == 27 && callbackMenu.classList.contains('callback-menu--show')) {
        event.preventDefault();
        callbackMenu.classList.remove('callback-menu--show');
        headerBrg.classList.remove('header-brg--active');
        modalOverlay.classList.remove('modal-overlay--callback-show');
        headerCall.classList.remove('header-call--overlayed');
        bodyEl.classList.remove('body-fixed')
    }
};

// установка событий по нажатию кнопок Call me back 
for (let e = 0; e < cbBtn.length; e++) {
    cbBtn[e].addEventListener('click', function() {
        callbackMenu.classList.add('callback-menu--show')
        headerBrg.classList.add('header-brg--active');
        modalOverlay.classList.add('modal-overlay--callback-show');
        headerCall.classList.add('header-call--overlayed');
        bodyEl.classList.add('body-fixed')
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

// обработка событий на кнопке формы call-block
const callBtn = document.querySelector('.call-btn');
if (callBtn) {
    callBtn.addEventListener('click', function(event) {
        event.preventDefault();
        const callBlockPhone = document.querySelector('.call-tel');
        const callCheckInput = document.querySelector('#call-check__input');
        const callCheckLabel = document.querySelector('.call-check label');

        callCheckLabel.addEventListener('click', function() {
            if (callCheckLabel.classList.contains('call-tel-wrong')) {
                callCheckLabel.classList.remove('call-tel-wrong');
            }
        });

        if (callBlockPhone.inputmask) {
            const unmaskedPhone = callBlockPhone.inputmask.unmaskedvalue();

            if (unmaskedPhone.length !== 10) {
                function inputListener() {
                    callBlockPhone.classList.remove('call-tel-wrong');
                }
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
                axios({
                    method: 'post',
                    url: '/php-scripts/telegram-send.php',
                    data: {
                      phone: transformNumber,
                      form: 'call-block-form'
                    }
                })
                .then(function (response) {
                    console.log(response.data);
                    if (response.data.status === 'ok') {
                        callBlockPhone.value = '';
                        const confBlock = document.querySelector('.confirm-block');
                        confBlock.classList.add('confirm-block--active');
                    } else {
                        const erMsg = response.data.messages_error;
                        callBlockPhone.value = '';
                    }
                });
            }
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
const deskCloseMenu = document.querySelector('.desktop-close-menu');
deskCloseMenu.addEventListener('click', function() {
    modalOverlay.classList.remove('modal-overlay--show');
    modalOverlay.classList.remove('modal-overlay--callback-show');
    callbackMenu.classList.remove('callback-menu--show');
    bodyEl.classList.remove('body-fixed');
});

// закрытие модального окна на десктопе по нажатию на оверлей
modalOverlay.addEventListener('click', function(event) {
    modalOverlay.classList.remove('modal-overlay--show');
    modalOverlay.classList.remove('modal-overlay--callback-show');
    callbackMenu.classList.remove('callback-menu--show');
    bodyEl.classList.remove('body-fixed');
});

// закрытие окна уведомления
const confirmBlock = document.querySelector('.confirm-block');
confirmBlock.addEventListener('click', function() {
    confirmBlock.classList.add('confirm-block--close');
    setTimeout(function() {
        confirmBlock.style.display = 'none'
;    }, 500)
});