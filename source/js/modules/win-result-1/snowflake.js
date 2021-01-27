import {bezierEasing} from '../../helpers/cubic-bezier.js';
import {animateProgress, animateInfiniteReverseProgress} from '../../helpers/animate';
import {windowHalfWidth, windowHalfHeight, ctx} from './window';
import {drawAll} from './draw-all';


export const snowFlakeLeft = {
  width: 119,
  height: 141,
  left: windowHalfWidth - 304,
  top: windowHalfHeight - 11,
  path: `img/snowflake-left.png`,
};

export const snowFlakeRight = {
  width: 94,
  height: 111,
  left: windowHalfWidth + 185,
  top: windowHalfHeight + 78,
  path: `img/snowflake-right.png`,
};

export const snowFlakeLeftImage = new Image();
export const snowFlakeRightImage = new Image();


let snowRightTranslateY = 0;
let snowRightOpacity = 0;
let snowLeftTranslateY = 0;
let snowLeftOpacity = 0;
let startAnimations = [];

export function animateSnowLeft() {
  if (startAnimations.indexOf(`snowLeft`) === -1) {
    startAnimations.push(`snowLeft`);
    animateProgress(changeSnowLeftOpacity(0, 1), 500);
    animateInfiniteReverseProgress(translateSnowLeft(0, -50), 3000, bezierEasing(0.42, 0, 0.58, 1));
  }

  drawAll();
}

export function animateSnowRight() {
  if (startAnimations.indexOf(`snowRight`) === -1) {
    startAnimations.push(`snowRight`);
    animateProgress(changeSnowRightOpacity(0, 1), 500);
    animateInfiniteReverseProgress(translateSnowRight(0, -70), 4000, bezierEasing(0.42, 0, 0.58, 1));
  }

  drawAll();
}


function changeSnowLeftOpacity(from, to) {
  return (progress) => {
    snowLeftOpacity = from + progress * (to - from);
  };
}

function translateSnowLeft(from, to) {
  return (progress) => {
    snowLeftTranslateY = from + progress * (to - from);
  };
}

function changeSnowRightOpacity(from, to) {
  return (progress) => {
    snowRightOpacity = from + progress * (to - from);
  };
}

function translateSnowRight(from, to) {
  return (progress) => {
    snowRightTranslateY = from + progress * (to - from);
  };
}


export function drawSnowLeft() {
  ctx.save();
  ctx.globalAlpha = snowLeftOpacity;
  ctx.translate(0, snowLeftTranslateY);
  ctx.drawImage(snowFlakeLeftImage, snowFlakeLeft.left, snowFlakeLeft.top, snowFlakeLeft.width, snowFlakeLeft.height);
  ctx.restore();
}

export function drawSnowRight() {
  ctx.save();
  ctx.globalAlpha = snowRightOpacity;
  ctx.translate(0, snowRightTranslateY);
  ctx.drawImage(snowFlakeRightImage, snowFlakeRight.left, snowFlakeRight.top, snowFlakeRight.width, snowFlakeRight.height);
  ctx.restore();
}


export default () => {};
