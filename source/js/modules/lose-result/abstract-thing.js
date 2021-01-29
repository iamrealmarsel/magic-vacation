import {scale} from '../../helpers/ctx-functions';


export default class AbstractThing {
  constructor(ctx, windowWidth, windowHeight) {
    this._ctx = ctx;
    this._windowWidth = windowWidth;
    this._windowHeight = windowHeight;
    this._windowHalfWidth = this._windowWidth / 2;
    this._windowHalfHeight = this._windowHeight / 2;

    this._img = new Image();

    this._scaleX = 0;
    this._scaleY = 0;
    this._startAnimations = [];

    this._isAnimationCompleted = false;
  }

  _draw() {
    this._ctx.save();
    scale(this._ctx, this._scaleX, this._scaleY, this._left + this._width / 2, this._top + this._height / 2);
    this._ctx.drawImage(this._img, this._left, this._top, this._width, this._height);
    this._ctx.restore();
  }

  _getTranslateXFrame(from, to) {
    return (progress) => {
      this._left = from + progress * (to - from);
    };
  }

  _getTranslateYFrame(from, to) {
    return (progress) => {
      this._top = from + progress * (to - from);
    };
  }

  _getScaleFrame(from, to) {
    return (progress) => {
      this._scaleX = from + progress * (to - from);
      this._scaleY = from + progress * (to - from);
    };
  }

  load() {
    return new Promise((resolve) => {
      this._img.addEventListener(`load`, resolve);
      this._img.src = this._path;
    });
  }

  animate() {
    if (this._startAnimations.indexOf(`abstractThing`) === -1) {
      this._startAnimations.push(`abstractThing`);
      Promise.all(this._animateAllChanges()).then(() => (this._isAnimationCompleted = true));
    }

    this._draw();

    return this._isAnimationCompleted;
  }
}
