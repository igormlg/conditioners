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
const introBlockBtn = document.querySelector('.intro-block__btn');
const callbackMenu = document.querySelector('.callback-menu');

headerBrg.addEventListener('click', function() {

    if (callbackMenu.classList.contains('callback-menu--show')) {
        callbackMenu.classList.remove('callback-menu--show')
        headerBrg.classList.remove('header-brg--active');
        modalOverlay.classList.remove('modal-overlay--callback-show');
        headerCall.classList.remove('header-call--overlayed');
        return;
    }
    headerBrg.classList.toggle('header-brg--active');
    headerMenu.classList.toggle('header-title-menu--active');
    modalOverlay.classList.toggle('modal-overlay--show');
    headerCall.classList.toggle('header-call--overlayed');
});

window.onkeydown = function(event) {
    if (event.keyCode == 27 && headerMenu.classList.contains('header-title-menu--active')) {
        event.preventDefault();
        headerBrg.classList.remove('header-brg--active');
        headerMenu.classList.remove('header-title-menu--active');
        modalOverlay.classList.remove('modal-overlay--show');
    } 
    if (event.keyCode == 27 && callbackMenu.classList.contains('callback-menu--show')) {
        event.preventDefault();
        callbackMenu.classList.remove('callback-menu--show');
        headerBrg.classList.remove('header-brg--active');
        modalOverlay.classList.remove('modal-overlay--callback-show');
        headerCall.classList.remove('header-call--overlayed');
    }
};

for (let el of [headerCall, introBlockBtn]) {
    el.addEventListener('click', function() {
        callbackMenu.classList.add('callback-menu--show')
        headerBrg.classList.add('header-brg--active');
        modalOverlay.classList.add('modal-overlay--callback-show');
        headerCall.classList.add('header-call--overlayed');
    });
}

// slider


function sliderStart(slider) {
    console.log
    let countS = 0;
    let widthS;
    const imagesS = slider.querySelectorAll('.slider img');
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


