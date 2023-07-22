
// const box = document.querySelector('.main');

// box.addEventListener('click', function () {
//     fetch('/php-scripts/telegram-send.php', {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     })
//     .then((response) => {
//         return response.json();
//     })
//     .then((data) => {
//         console.log(data)
//     })
//     .catch((er) => {
//         console.log(er)
//     })
// })

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
        console.log(headerBrg)
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
    sliderStart(el);
}

// inputmask for phone
let telInput = document.querySelectorAll('input[type="tel"]')
let im = new Inputmask("+7 (999) 999 - 99 - 99", { showMaskOnHover: false });

if (telInput) {
    im.mask(telInput)
}

// отключение события по умолчанию на кнопке формы
const callBtn = document.querySelector('.call-btn');
if (callBtn) {
    callBtn.addEventListener('click', function(event) {
        event.preventDefault();
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
});

// закрытие модального окна на десктопе по нажатию на оверлей
modalOverlay.addEventListener('click', function(event) {
    modalOverlay.classList.remove('modal-overlay--show');
    modalOverlay.classList.remove('modal-overlay--callback-show');
    callbackMenu.classList.remove('callback-menu--show');
});