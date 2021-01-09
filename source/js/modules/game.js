import {animate} from './animation.js';

const counterMinutes = document.querySelector(`.game__counter_minutes`);
const counterSeconds = document.querySelector(`.game__counter_seconds`);

const formatTime = (time) => {
  return time < 10 ? `0${time}` : time;
};

const drawTimer = (progress) => {
  const milliseconds = 300000 - progress * 300000;
  const dateTimer = new Date(milliseconds);
  counterMinutes.textContent = formatTime(dateTimer.getMinutes());
  counterSeconds.textContent = formatTime(dateTimer.getSeconds());
};

export default () => {
  animate(300, 1, drawTimer);
};
