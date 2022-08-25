import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

Notiflix.Notify.init({});

const input = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');

startButton.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (isDateInFuture(selectedDates[0])) {
      startButton.removeAttribute('disabled', '');
    } else {
      startButton.setAttribute('disabled', '');
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};

const fp = flatpickr(input, options);
startButton.addEventListener('click', handleStart);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function isDateInFuture(date) {
  const comparedDate = new Date(date);
  const nowDate = new Date();
  return comparedDate > nowDate;
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function fillTimer({ days, hours, minutes, seconds }) {
  document.querySelector('span[data-days]').innerText = addLeadingZero(days);
  document.querySelector('span[data-hours]').innerText = addLeadingZero(hours);
  document.querySelector('span[data-minutes]').innerText =
    addLeadingZero(minutes);
  document.querySelector('span[data-seconds]').innerText =
    addLeadingZero(seconds);
}

function handleStart() {
  startButton.setAttribute('disabled', '');
  let timeLeftInMs, timeLeft;

  timerId = setInterval(() => {
    timeLeftInMs = fp.selectedDates[0] - Date.now();
    timeLeft = convertMs(timeLeftInMs);
    fillTimer(timeLeft);

    if (timeLeftInMs <= 999) {
      clearInterval(timerId);
    }
  }, 1000);
}
