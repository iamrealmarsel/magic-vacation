export default () => {
  const prizesScreen = document.querySelector(`.screen--prizes`);

  const primaryAwardImg = document.querySelector(`.prizes__item-primary-svg`);
  const primaryAwardSvgPath = `img/primary.svg`;

  const secondaryAwardImg = document.querySelector(`.prizes__item-secondary-svg`);
  const secondaryAwardSvgPath = `img/secondary.svg`;

  const additionalAwardImg = document.querySelector(`.prizes__item-additional-svg`);
  const additionalAwardSvgPath = `img/additional.svg`;

  let animationShown = false;

  document.body.addEventListener(`screenChanged`, () => {
    const prizesScreenActive = prizesScreen.classList.contains(`active`);
    console.log(prizesScreenActive, animationShown);

    if (prizesScreenActive && !animationShown) {
      console.log(`hi`);

      primaryAwardImg.src = `${primaryAwardSvgPath}?${Math.random()}`;


      setTimeout(() => {
        secondaryAwardImg.src = `${secondaryAwardSvgPath}?${Math.random()}`;
      }, 3900);


      setTimeout(() => {
        additionalAwardImg.src = `${additionalAwardSvgPath}?${Math.random()}`;
      }, 5900);

      animationShown = true;
    }
  });

};
