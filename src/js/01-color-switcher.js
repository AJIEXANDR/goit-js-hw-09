const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};
let intervalId = null;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  changeColor();
  refs.startBtn.setAttribute('disabled', true);
}

function changeColor() {
  intervalId = setInterval(() => {
    const getColor = getRandomHexColor();
    document.body.style.backgroundColor = `${getColor}`;
  }, 1000);
}

function onStopBtnClick() {
  clearTimeout(intervalId);
  refs.startBtn.removeAttribute('disabled');
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
