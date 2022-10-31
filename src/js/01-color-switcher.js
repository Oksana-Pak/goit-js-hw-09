const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};

refs.stop.disabled = true;
let intervalId;

refs.start.addEventListener('click', onClickBtnStart);
refs.stop.addEventListener('click', onClickBtnStop);

function onClickBtnStart() {
  refs.stop.disabled = false;
  refs.start.disabled = true;

  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onClickBtnStop() {
  clearInterval(intervalId);
  refs.start.disabled = false;
  refs.stop.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
