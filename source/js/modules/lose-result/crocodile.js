import {animateProgressDelay} from '../../helpers/animate';
import {bezierEasing} from '../../helpers/cubic-bezier';
import AbstractThing from './abstract-thing';


const getLockCoords = (top, left, bottom, right, lockWidth) => {
  const rightMiddleBend = {
    x: right - 30,
    y: bottom - 146,
  };
  const leftMiddleBend = {
    x: left + 30,
    y: bottom - 146,
  };

  const middleTop = {
    x: left + lockWidth / 2,
    y: top,
  };

  const cp1 = {
    x: rightMiddleBend.x + 40,
    y: rightMiddleBend.y - 26,
  };
  const cp2 = {
    x: middleTop.x + 100,
    y: middleTop.y + 5,
  };
  const cp3 = {
    x: middleTop.x - 100,
    y: middleTop.y + 5,
  };
  const cp4 = {
    x: leftMiddleBend.x - 40,
    y: leftMiddleBend.y - 26,
  };

  return {
    rightMiddleBend,
    leftMiddleBend,
    middleTop,
    cp1,
    cp2,
    cp3,
    cp4,
  };
};

export default class Crocodile extends AbstractThing {
  constructor(ctx, windowWidth, windowHeight) {
    super(ctx, windowWidth, windowHeight);

    this._left = this._windowHalfWidth + 64;
    this._top = this._windowHalfHeight - 77;
    this._width = 535;
    this._height = 170;
    this._path = `img/crocodile.png`;

    this._widthHole = 171;
    this._heightHole = 292;
    this._leftHole = this._windowHalfWidth - this._widthHole / 2;
    this._topHole = this._windowHalfHeight - 88;
    this._rightHole = this._leftHole + this._widthHole;
    this._bottomHole = this._topHole + this._heightHole;
    const lockCoords = getLockCoords(this._topHole, this._leftHole, this._bottomHole, this._rightHole, this._widthHole);
    this._rightMiddleBend = lockCoords.rightMiddleBend;
    this._middleTop = lockCoords.middleTop;
    this._cp1 = lockCoords.cp1;
    this._cp2 = lockCoords.cp2;
  }

  _draw() {
    this._ctx.save();

    this._ctx.beginPath();
    this._ctx.moveTo(this._rightHole, this._bottomHole);
    this._ctx.lineTo(this._rightMiddleBend.x, this._rightMiddleBend.y);
    this._ctx.bezierCurveTo(this._cp1.x, this._cp1.y, this._cp2.x, this._cp2.y, this._middleTop.x, this._middleTop.y);
    this._ctx.lineTo(0, top);
    this._ctx.lineTo(0, this._windowHeight);
    this._ctx.lineTo(this._rightHole, this._windowHeight);
    this._ctx.closePath();
    this._ctx.clip();

    this._ctx.drawImage(this._img, this._left, this._top, this._width, this._height);

    this._ctx.restore();
  }

  _animateAllChanges() {
    const animations = [
      animateProgressDelay(
          this._getTranslateXFrame(this._left, this._windowHalfWidth - 253), 1000, 1300, bezierEasing(0.42, 0, 1, 1)
      ),
      animateProgressDelay(
          this._getTranslateYFrame(this._top, this._windowHalfHeight + 60), 1000, 1300, bezierEasing(0.42, 0, 1, 1)
      ),
    ];

    return animations;
  }
}

