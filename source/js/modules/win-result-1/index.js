import {animateProgress, animateInfinite} from '../../helpers/animate';
import {animatePlane, animateTrees, airplaneImage, airplane} from './plane';
import {animateSnowLeft, animateSnowRight, snowFlakeLeftImage, snowFlakeLeft, snowFlakeRightImage, snowFlakeRight} from './snowflake';
import {animateSeaCalf, iceImage, ice, seaСalfImage, seaСalf} from './walrus';


const promiseAll = Promise.all([
  new Promise((resolve) => airplaneImage.addEventListener(`load`, () => resolve())),
  new Promise((resolve) => iceImage.addEventListener(`load`, () => resolve())),
  new Promise((resolve) => seaСalfImage.addEventListener(`load`, () => resolve())),
  new Promise((resolve) => snowFlakeLeftImage.addEventListener(`load`, () => resolve())),
  new Promise((resolve) => snowFlakeRightImage.addEventListener(`load`, () => resolve())),
]);

airplaneImage.src = airplane.path;
iceImage.src = ice.path;
seaСalfImage.src = seaСalf.path;
snowFlakeLeftImage.src = snowFlakeLeft.path;
snowFlakeRightImage.src = snowFlakeRight.path;


promiseAll.then(() => {
  setTimeout(() => animateProgress(animatePlane, 500), 1000);
  setTimeout(() => animateProgress(animateTrees, 500), 1500);
  setTimeout(() => animateInfinite(animateSnowLeft), 1300);
  setTimeout(() => animateInfinite(animateSnowRight), 1000);
  animateInfinite(animateSeaCalf);
});


export default () => {};
