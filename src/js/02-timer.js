import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/dark.css');

let timeGlobal = null;

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  btnEl: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  min: document.querySelector('[data-minutes]'),
  sec: document.querySelector('[data-seconds]'),
};

refs.btnEl.setAttribute('disabled', true);
refs.btnEl.addEventListener('click', onBtnClick);

const pickerConfig = {
  enableTime: true,
  time_24hr: true,
  dateFormat: 'd-m-Y H:i',
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0].getTime();
    dateChecker(Date.now(), selectedDate);
    timeGlobal = selectedDate;
  },
};

flatpickr('#datetime-picker', pickerConfig);

function onBtnClick() {
  setInterval(() => {
    const deltaTime = timeGlobal - Date.now();
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.min.textContent = addLeadingZero(minutes);
    refs.sec.textContent = addLeadingZero(seconds);
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function dateChecker(dateNow, selectedDate) {
  if (selectedDate <= dateNow) {
    alert('Please choose a date in the future');
    return;
  } else {
    refs.btnEl.removeAttribute('disabled');
  }
}

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
