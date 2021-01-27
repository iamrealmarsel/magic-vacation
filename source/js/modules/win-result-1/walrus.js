import {animateProgress, animateInfiniteReverseProgress} from '../../helpers/animate';
import {elasticOut} from '../../helpers/time-functions';
import {rotate} from '../../helpers/ctx-functions';
import {bezierEasing} from '../../helpers/cubic-bezier.js';
import {windowHalfWidth, windowHalfHeight, ctx} from './window';
import {drawAll} from './draw-all';


export const ice = {
  width: 408,
  height: 167,
  get left() {
    return windowHalfWidth - this.width / 2;
  },
  top: windowHalfHeight + 89,
  path: `img/ice.png`,
};

export const seaСalf = {
  width: 271,
  height: 212,
  get left() {
    return windowHalfWidth - this.width / 2;
  },
  top: windowHalfHeight - 18,
  path: `img/sea-calf.png`,
};

export const iceImage = new Image();
export const seaСalfImage = new Image();

let seaСalfTranslateY = 300;
let seaСalfRotate = 35;
let startAnimations = [];

export function animateSeaCalf() {
  if (startAnimations.indexOf(`seacalf`) === -1) {
    startAnimations.push(`seacalf`);
    animateProgress(translateSeaCalf(seaСalfTranslateY, 0), 5000, elasticOut);
    setTimeout(() => animateProgress(rotateSeaCalf(seaСalfRotate, 0), 5000, elasticOut), 700);
    setTimeout(() => animateInfiniteReverseProgress(rotateSeaCalf(0, -3), 2000, bezierEasing(0.42, 0, 0.58, 1)), 5700);
  }

  drawAll();
}


function translateSeaCalf(from, to) {
  return (progress) => {
    seaСalfTranslateY = from + progress * (to - from);
  };
}

function rotateSeaCalf(from, to) {
  return (progress) => {
    seaСalfRotate = from + progress * (to - from);
  };
}


export function drawSeaCalf() {
  ctx.save();
  ctx.translate(0, seaСalfTranslateY);
  rotate(ctx, seaСalfRotate, ice.left + ice.width - (ice.width / 4), ice.top + ice.height / 4);
  ctx.drawImage(iceImage, ice.left, ice.top, ice.width, ice.height);
  ctx.drawImage(seaСalfImage, seaСalf.left, seaСalf.top, seaСalf.width, seaСalf.height);
  ctx.restore();
}


export default () => {};
