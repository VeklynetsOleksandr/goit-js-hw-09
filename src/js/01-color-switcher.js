const btnRefStart = document.querySelector('[data-start]');
const btnRefStop = document.querySelector('[data-stop]');

let timerId = null;

btnRefStart.addEventListener('click', onStartColorSwitcher);
btnRefStop.addEventListener('click', onStopColorSwitcher);

function onStartColorSwitcher() {
  btnRefStart.setAttribute('disabled', true);
  btnRefStop.removeAttribute('disabled');

  timerId = setInterval(() => {
    const body = document.querySelector('body');
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopColorSwitcher() {
  btnRefStop.setAttribute('disabled', true);
  clearInterval(timerId);
  btnRefStart.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
