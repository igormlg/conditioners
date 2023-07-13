const box = document.querySelector('.main');
const btn = document.querySelector('.button');

box.addEventListener('click', function () {
    fetch('/php-scripts/telegram-send.php', {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data)
    })
    .catch((er) => {
        console.log(er)
    })
})