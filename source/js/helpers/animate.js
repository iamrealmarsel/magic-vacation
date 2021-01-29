import {makeEaseOut, linear} from './time-functions';

export function animateProgress(render, duration, easing = linear) {
  return new Promise((resolve) => {
    const start = Date.now();
    (function loop() {
      const p = (Date.now() - start) / duration;
      if (p >= 1) {
        render(1);
        resolve();
      } else {
        render(easing(p));
        requestAnimationFrame(loop);
      }
    }());
  });
}

export function animateProgressDelay(render, duration, delay, easing = linear) {
  return new Promise((resolve) => {
    const callback = () => {
      const start = Date.now();
      (function loop() {
        const p = (Date.now() - start) / duration;
        if (p >= 1) {
          render(1);
          resolve();
        } else {
          render(easing(p));
          requestAnimationFrame(loop);
        }
      }());
    };
    setTimeout(callback, delay);
  });
}

export function animateInfiniteReverseProgress(render, duration, easing = linear) {
  let start = Date.now();
  let reverse = false;
  const easingReverse = makeEaseOut(easing);

  (function loop() {
    let p = (Date.now() - start) / duration;
    if (p >= 1) {
      if (reverse) {
        p = 0;
        render(p);
      } else {
        p = 1;
        render(p);
      }
      start = Date.now();
      reverse = !reverse;
      requestAnimationFrame(loop);
    } else {
      if (reverse) {
        p = 1 - p;
        render(easingReverse(p));
      } else {
        render(easing(p));
      }
      requestAnimationFrame(loop);
    }
  })();
}

export function animateInfiniteAlternateProgress(render, duration, easing = linear) {
  let start = Date.now();
  let reverse = false;

  (function loop() {
    let p = (Date.now() - start) / duration;
    if (p >= 1) {
      if (reverse) {
        p = 0;
        render(p);
      } else {
        p = 1;
        render(p);
      }
      start = Date.now();
      reverse = !reverse;
      requestAnimationFrame(loop);
    } else {
      if (reverse) {
        p = 1 - p;
        render(easing(p));
      } else {
        render(easing(p));
      }
      requestAnimationFrame(loop);
    }
  })();
}

export function animateInfiniteProgress(render, duration, easing = linear) {
  let start = Date.now();

  (function loop() {
    const p = (Date.now() - start) / duration;
    if (p >= 1) {
      render(1);
      start = Date.now();
      requestAnimationFrame(loop);
    } else {
      render(easing(p));
      requestAnimationFrame(loop);
    }
  }());
}

export function animateInfinite(render) {
  (function loop() {
    render();
    requestAnimationFrame(loop);
  })();
}

export function animateWithAutoCompletion(render) {
  (function loop() {
    if (!render()) {
      requestAnimationFrame(loop);
    }
  })();
}

