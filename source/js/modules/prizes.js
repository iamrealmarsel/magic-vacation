let animationShown = false;

export default () => {
  const primaryAwardImg = document.querySelector(`.prizes__item-primary-svg`);
  const primaryAwardSvgPath = `img/primary.svg`;

  const secondaryAwardImg = document.querySelector(`.prizes__item-secondary-svg`);
  const secondaryAwardSvgPath = `img/secondary.svg`;

  const additionalAwardImg = document.querySelector(`.prizes__item-additional-svg`);
  const additionalAwardSvgPath = `img/additional.svg`;

  if (!animationShown) {
    primaryAwardImg.src = `${primaryAwardSvgPath}`;

    setTimeout(() => {
      secondaryAwardImg.src = `${secondaryAwardSvgPath}`;
    }, 3800);

    setTimeout(() => {
      additionalAwardImg.src = `${additionalAwardSvgPath}`;
    }, 6600);

    animationShown = true;
  }
};
