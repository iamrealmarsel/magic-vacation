import {animateProgressDelay, animateProgress} from '../../helpers/animate';
import {bezierEasing} from '../../helpers/cubic-bezier';
import {scale} from '../../helpers/ctx-functions';


export default class Tear {
  constructor(ctx, windowWidth, windowHeight) {
    this._ctx = ctx;
    this._windowWidth = windowWidth;
    this._windowHeight = windowHeight;
    this._windowHalfWidth = this._windowWidth / 2;
    this._windowHalfHeight = this._windowHeight / 2;

    this._width = 40;
    this._height = 60;
    this._left = this._windowHalfWidth - 39;
    this._top = this._windowHalfHeight + 125;
    this._opacity = 1;
    this._scaleX = 0;
    this._scaleY = 0;

    this._startAnimations = [];
    this._isAnimationCompleted = false;
  }

  _getTranslateYFrame(from, to) {
    return (progress) => {
      this._top = from + progress * (to - from);
    };
  }

  _getOpacityFrame(from, to) {
    return (progress) => {
      this._opacity = from + progress * (to - from);
    };
  }

  _getScaleFrame(from, to) {
    return (progress) => {
      this._scaleX = from + progress * (to - from);
      this._scaleY = from + progress * (to - from);
    };
  }

  _draw() {
    this._ctx.save();

    scale(this._ctx, this._scaleX, this._scaleY, this._left, this._top);
    this._ctx.globalAlpha = this._opacity;

    this._ctx.beginPath();
    this._ctx.moveTo(this._left, this._top);
    this._ctx.lineTo(this._left - 15, this._top + 30);
    this._ctx.bezierCurveTo(this._left - 15 - 10, this._top + 30 + 12, this._left - 15, this._top + this._height, this._left, this._top + this._height);
    this._ctx.bezierCurveTo(this._left + 15, this._top + this._height, this._left + 15 + 10, this._top + 30 + 12, this._left + 15, this._top + 30);
    this._ctx.closePath();
    this._ctx.fillStyle = `rgb(180, 195, 255)`;
    this._ctx.fill();

    this._ctx.restore();
  }

  async _animateDrop() {
    await animateProgressDelay(this._getScaleFrame(0, 1), 500, 2300, bezierEasing(0.42, 0, 1, 1));
    await animateProgress(this._getTranslateYFrame(this._top, this._top + 50), 500, bezierEasing(0.42, 0, 1, 1));
    await animateProgress(this._getOpacityFrame(1, 0), 200, bezierEasing(0.42, 0, 1, 1));
    this._top = this._top - 50;
    this._opacity = 1;
    await animateProgress(this._getScaleFrame(0, 1), 500, bezierEasing(0.42, 0, 1, 1));
    await animateProgress(this._getTranslateYFrame(this._top, this._top + 50), 500, bezierEasing(0.42, 0, 1, 1));
    await animateProgress(this._getOpacityFrame(1, 0), 200, bezierEasing(0.42, 0, 1, 1));
    this._top = this._top - 50;
    this._opacity = 1;
    await animateProgress(this._getScaleFrame(0, 1), 500, bezierEasing(0.42, 0, 1, 1));
    await animateProgress(this._getTranslateYFrame(this._top, this._top + 50), 500, bezierEasing(0.42, 0, 1, 1));
  }

  _animateAllChanges() {
    return [
      this._animateDrop(),
    ];
  }

  animate() {
    if (this._startAnimations.indexOf(`tear`) === -1) {
      this._startAnimations.push(`tear`);
      Promise.all(this._animateAllChanges()).then(() => (this._isAnimationCompleted = true));
    }

    this._draw();

    return this._isAnimationCompleted;
  }
}

