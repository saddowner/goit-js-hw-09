function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const buttonStart = document.querySelector('[data-start]')
const buttonStop = document.querySelector('[data-stop]')
const body = document.querySelector('body');

buttonStart.addEventListener('click', getColors);
buttonStop.addEventListener('click', stopColors)

let timer = null;

function getColors () {
    timer = setInterval(() => {
       body.style.backgroundColor = getRandomHexColor()
    }, 1000)
    buttonStart.disabled = true;
}

function stopColors() {
    buttonStart.disabled = false;
    clearInterval(timer);
}