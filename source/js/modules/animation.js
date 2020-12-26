const animateTitle = (selector, property, timer, maxDelay) => {
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

const randomInt = (upper) => {
  const lower = 0;
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};


export {animateTitle};
