import {animateProgress} from '../../helpers/animate';
import {bezierEasing} from '../../helpers/cubic-bezier';
import AbstractThing from './abstract-thing';


export default class Keyhole extends AbstractThing {
  constructor(ctx, windowWidth, windowHeight) {
    super(ctx, windowWidth, windowHeight);

    this._width = 171;
    this._height = 292;
    this._left = this._windowHalfWidth - this._width / 2;
    this._top = this._windowHalfHeight - 88;
    this._path = `img/key.png`;
  }

  _animateAllChanges() {
    const animations = [
      animateProgress(this._getScaleFrame(0, 1), 500, bezierEasing(0.42, 0, 1, 1)),
    ];

    return animations;
  }
}

