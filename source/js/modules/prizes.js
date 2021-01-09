import {animate} from './animation.js';

let animationShown = false;
const primaryAwardImg = document.querySelector(`.prizes__item-primary-svg`);
const primaryAwardSvgPath = `img/primary.svg`;
const secondaryAwardImg = document.querySelector(`.prizes__item-secondary-svg`);
const secondaryAwardSvgPath = `img/secondary.svg`;
const additionalAwardImg = document.querySelector(`.prizes__item-additional-svg`);
const additionalAwardSvgPath = `img/additional.svg`;

const bonusCounter = document.querySelector(`.js-prize_bonus`);
const travelCounter = document.querySelector(`.js-prize_travel`);
const caseCounter = document.querySelector(`.js-prize_case`);

function drawBonus(progress) {
  bonusCounter.textContent = Math.floor(900 * progress);
}
function drawCase(progress) {
  caseCounter.textContent = Math.floor(7 * progress);
}
function drawTravel(progress) {
  travelCounter.textContent = Math.floor(3 * progress);
}

export default () => {
  if (!animationShown) {
    primaryAwardImg.src = `${primaryAwardSvgPath}`;
    animate(3, 12, drawTravel);

    setTimeout(() => {
      secondaryAwardImg.src = `${secondaryAwardSvgPath}`;
      animate(2.5, 12, drawCase);
    }, 3800);

    setTimeout(() => {
      additionalAwardImg.src = `${additionalAwardSvgPath}`;
      animate(1.5, 12, drawBonus);
    }, 6600);

    animationShown = true;
  }
};
