import {animateProgress} from '../../helpers/animate';
import {rotate} from '../../helpers/ctx-functions';
import {windowHalfWidth, windowHalfHeight, ctx} from './window';
import {drawAll} from './draw-all';

export const airplane = {
  width: 82,
  height: 79,
  left: windowHalfWidth + 355,
  top: windowHalfHeight - 52,
  path: `img/airplane.png`,
};

const airplaneStart = {
  x: windowHalfWidth - 50,
  y: windowHalfHeight - 240,
};

const airplaneFinish = {
  x: windowHalfWidth + 354,
  y: windowHalfHeight - 133,
};

const staticTreeTopPoint = {
  x: windowHalfWidth + 100,
  y: windowHalfHeight - 100,
};

const dynamicTreeTopPoint = {
  x: windowHalfWidth + 30,
  y: 0,
};

const getPlaneTail = () => ({
  x: airplaneX + airplane.width * 0.14,
  y: airplaneY + airplane.height * 0.865,
});

export const airplaneImage = new Image();

let airplaneX = 0;
let airplaneY = 0;
let airplaneOpacity = 0;
let ellipseHeight = 0;
let airplaneAngle = 0;
let animationProgress = 0;
let treeOpacity = 0;
let startAnimations = [];

export function animatePlane() {
  if (startAnimations.indexOf(`plane`) === -1) {
    startAnimations.push(`plane`);
    animateProgress(returnProgress, 500);
    animateProgress(changeEllipse(0, 340), 500);
    animateProgress(changeAirplaneOpacity(0, 1), 500 * 0.3);
    animateProgress(translateAirplane(airplaneStart, airplaneFinish), 500);
    animateProgress(rotateAirplane(90, -10), 500 - (500 * 0.35));
  }

  drawAll();
}

export function animateTrees() {
  if (startAnimations.indexOf(`trees`) === -1) {
    startAnimations.push(`trees`);
    animateProgress(translateTree(windowHalfHeight - 50, windowHalfHeight - 190), 300);
    animateProgress(opacityTree(0.5, 1), 300);
  }

  drawAll();
}


function translateTree(from, to) {
  return (progress) => {
    dynamicTreeTopPoint.y = from + progress * (to - from);
  };
}

function opacityTree(from, to) {
  return (progress) => {
    treeOpacity = from + progress * (to - from);
  };
}

function rotateAirplane(from, to) {
  return (progress) => {
    airplaneAngle = from + progress * (to - from);
  };
}

function changeAirplaneOpacity(from, to) {
  return (progress) => {
    airplaneOpacity = from + progress * (to - from);
  };
}

function changeEllipse(from, to) {
  return (progress) => {
    ellipseHeight = from + progress * (to - from);
  };
}

function translateAirplane(from, to) {
  return (progress) => {
    airplaneX = from.x + progress * (to.x - from.x);
    airplaneY = from.y - (Math.sign(to.y - from.y) * Math.abs(to.y - from.y) * Math.sin((progress * Math.PI) - (5 / 4 * Math.PI)));
  };
}

function returnProgress(progress) {
  animationProgress = progress;
}


export function drawPlane() {
  ctx.save();
  const airplaneTail = getPlaneTail();
  rotate(ctx, airplaneAngle, airplaneTail.x, airplaneTail.y);
  ctx.globalAlpha = airplaneOpacity;
  ctx.translate(airplaneX, airplaneY);
  ctx.drawImage(airplaneImage, 0, 0, airplane.width, airplane.height);
  ctx.restore();

  drawBack();
}

function drawBack() {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(airplaneStart.x, airplaneStart.y);
  const airplaneTail = getPlaneTail();
  const cp1 = {
    x: airplaneStart.x + 145 * animationProgress,
    y: airplaneStart.y + 10 * animationProgress,
  };
  const cp2 = {
    x: airplaneTail.x - 143 * animationProgress,
    y: airplaneTail.y + 59 * animationProgress,
  };
  const cp3 = {
    x: airplaneTail.x - 42 * animationProgress,
    y: airplaneTail.y + 71 * animationProgress,
  };
  const cp4 = {
    x: airplaneStart.x + 240 * animationProgress,
    y: airplaneStart.y + 325 * animationProgress,
  };
  const cp5 = {
    x: airplaneStart.x - 280 * animationProgress,
    y: airplaneStart.y + ellipseHeight,
  };
  const cp6 = {
    x: airplaneStart.x - 280 * animationProgress,
    y: airplaneStart.y,
  };
  ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, airplaneTail.x, airplaneTail.y);
  ctx.bezierCurveTo(cp3.x, cp3.y, cp4.x, cp4.y, airplaneStart.x, airplaneStart.y + ellipseHeight);
  ctx.bezierCurveTo(cp5.x, cp5.y, cp6.x, cp6.y, airplaneStart.x, airplaneStart.y);
  ctx.fillStyle = `rgb(172, 195, 255)`;
  ctx.globalAlpha = airplaneOpacity;
  ctx.fill();
  ctx.restore();
}

export function drawStaticTree() {
  ctx.save();
  ctx.fillStyle = `rgb(92, 66, 137)`;
  ctx.beginPath();
  ctx.moveTo(staticTreeTopPoint.x, staticTreeTopPoint.y);
  ctx.lineTo(staticTreeTopPoint.x + 40, staticTreeTopPoint.y + 200);
  ctx.lineTo(staticTreeTopPoint.x - 40, staticTreeTopPoint.y + 200);
  ctx.fill();
  ctx.restore();
}

export function drawDynamicTree() {
  ctx.save();
  ctx.fillStyle = `rgb(92, 66, 137)`;
  ctx.beginPath();
  ctx.moveTo(dynamicTreeTopPoint.x, dynamicTreeTopPoint.y);
  ctx.lineTo(dynamicTreeTopPoint.x + 50, dynamicTreeTopPoint.y + 300);
  ctx.lineTo(dynamicTreeTopPoint.x - 50, dynamicTreeTopPoint.y + 300);
  ctx.globalAlpha = treeOpacity;
  ctx.fill();
  ctx.restore();
}


export default () => {};


