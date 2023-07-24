import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const daysTimer = document.querySelector('[data-days]');
const hoursTimer = document.querySelector('[data-hours]');
const minsTimer = document.querySelector('[data-minutes]');
const secsTimer = document.querySelector('[data-seconds]');

startBtn.disabled = true;

let userDate = null;

const defaultDate = new Date();
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose() {
        userDate = fp.selectedDates[0];
        // console.log(selectedDates[0]);
        if (userDate < defaultDate) {
            Notiflix.Notify.failure("Please choose a date in the future");
        } else {
            startBtn.disabled = false;
    }
    }
};

const fp = flatpickr("#datetime-picker", options);

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


function startTimer() {
    const timer = setInterval(() => {
        const currentDate = new Date();
        const timeOfTimer = convertMs(userDate - currentDate);

    const days = timeOfTimer.days;
    const hours = timeOfTimer.hours;
    const minutes = timeOfTimer.minutes;
    const seconds = timeOfTimer.seconds;
        
        function addLeadingZero() {
            daysTimer.textContent = days.toString().padStart(2, '0');
            hoursTimer.textContent = hours.toString().padStart(2, '0');
            minsTimer.textContent = minutes.toString().padStart(2, '0');
            secsTimer.textContent = seconds.toString().padStart(2, '0');

}
        if (timeOfTimer.seconds >= 0) {
            addLeadingZero(daysTimer, hoursTimer, minsTimer, secsTimer);
    } else {
        clearInterval(timer);
    }
}, 1000)
}



startBtn.addEventListener('click', startTimer)