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

headerBrg.addEventListener('click', function() {
    headerBrg.classList.toggle('header-brg--active');
    headerMenu.classList.toggle('header-title-menu--active');
    modalOverlay.classList.toggle('modal-overlay--show');
    
});

window.onkeydown = function(event) {
    event.preventDefault();
    if (event.keyCode == 27 || headerBrg.classList.contains('header-brg--active')) {
        console.log( 'escape pressed' );
        headerBrg.classList.remove('header-brg--active');
        headerMenu.classList.remove('header-title-menu--active');
        modalOverlay.classList.remove('modal-overlay--show');
    }
};

