import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  button: document.querySelector('[data-start]'),
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
refs.button.disabled = true;

let timeDifference;

Notify.init({
  position: 'center-top',
  clickToClose: true,
});

const options = {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = options.defaultDate.getTime();
    const selectedDate = selectedDates[0].getTime();
    if (currentDate >= selectedDate) {
      Notify.warning('Please choose a date in the future');
      return;
    }
    refs.button.disabled = false;
    timeDifference = selectedDate - currentDate;
    return timeDifference;
  },
};

flatpickr(refs.input, options);

// ==========================================================
refs.button.addEventListener('click', onBtnStartClick);

function onBtnStartClick() {
  let intervalId = setInterval(() => {
    let timeToCount = convertMs(timeDifference);

    refs.days.textContent = addLeadingZero(timeToCount.days);
    refs.hours.textContent = addLeadingZero(timeToCount.hours);
    refs.minutes.textContent = addLeadingZero(timeToCount.minutes);
    refs.seconds.textContent = addLeadingZero(timeToCount.seconds);

    timeDifference -= 1000;
    if (timeDifference < 0) {
      clearInterval(intervalId);
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
