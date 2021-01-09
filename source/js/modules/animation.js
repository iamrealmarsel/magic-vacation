import {randomInt} from './utils.js';

export const animateTitle = (selector, property, timer, maxDelay) => {
  const createSpanElement = (content) => {
    const timeDelay = randomInt(maxDelay);
    const span = document.createElement(`span`);
    span.textContent = content;
    span.classList.add(`letter`);
    span.style.transition = `${property} ${timer}ms ease ${timeDelay}ms`;

    return span;
  };

  const targetElement = document.querySelector(selector);
  targetElement.classList.add(`animate-title`);
  const targetText = targetElement.textContent.trim();
  const words = targetText.split(` `).filter((word) => word !== ``);

  const spanText = words.map((word) => {
    const letters = word.trim().split(``);
    const spanLetters = letters.map((letter) => createSpanElement(letter));
    const spanWord = document.createElement(`span`);
    spanWord.classList.add(`word`);
    spanWord.append(...spanLetters);
    spanWord.append(` `);

    return spanWord;
  });

  targetElement.innerHTML = ``;
  targetElement.append(...spanText);
};

export const animate = (durationSeconds, fps, draw) => {
  const duration = durationSeconds * 1000;
  const frameInterval = 1000 / fps;
  const start = Date.now();
  let startFrame = start;
  let progress = 0;

  requestAnimationFrame(function cb() {
    let endFrame = Date.now();
    let elapsed = endFrame - startFrame;

    if (elapsed > frameInterval) {
      let extra = elapsed % frameInterval;
      startFrame = endFrame - extra;
      progress = (endFrame - start) / duration;
      if (progress > 1) {
        progress = 1;
      }
      draw(progress);
    }

    if (progress < 1) {
      requestAnimationFrame(cb);
    }
  });
};
