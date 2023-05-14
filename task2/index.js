const btn = document.querySelector('.btn');
const btnSvg = document.querySelector('.button__svg')

btn.addEventListener('click', () => {
    alert(`Screen width: ${window.screen.width}, Screen height: ${window.screen.height}`);
});