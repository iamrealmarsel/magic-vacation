import {animateWithAutoCompletion} from '../../helpers/animate';
import Crocodile from './crocodile';
import Flamingo from './flamingo';
import Leaf from './leaf';
import Saturn from './saturn';
import Watermelon from './watermelon';
import Snowflake from './snowflake';
import Keyhole from './keyhole';
import Tear from './tear';

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

const canvas = document.querySelector(`#lose-result`);
const ctx = canvas.getContext(`2d`);
canvas.width = windowWidth;
canvas.height = windowHeight;

const crocodile = new Crocodile(ctx, windowWidth, windowHeight);
const flamingo = new Flamingo(ctx, windowWidth, windowHeight);
const leaf = new Leaf(ctx, windowWidth, windowHeight);
const saturn = new Saturn(ctx, windowWidth, windowHeight);
const watermelon = new Watermelon(ctx, windowWidth, windowHeight);
const snowflake = new Snowflake(ctx, windowWidth, windowHeight);
const keyhole = new Keyhole(ctx, windowWidth, windowHeight);
const tear = new Tear(ctx, windowWidth, windowHeight);

const loadedImages = [
  crocodile.load(),
  flamingo.load(),
  leaf.load(),
  saturn.load(),
  watermelon.load(),
  snowflake.load(),
  keyhole.load(),
];

async function animateLoseResult() {
  await Promise.all(loadedImages);

  animateWithAutoCompletion(() => {
    ctx.clearRect(0, 0, windowWidth, windowHeight);

    const runningAnimations = [
      keyhole.animate(),
      crocodile.animate(),
      leaf.animate(),
      flamingo.animate(),
      saturn.animate(),
      watermelon.animate(),
      snowflake.animate(),
      tear.animate(),
    ];

    return runningAnimations.every((isCompleted) => isCompleted);
  });
}

animateLoseResult();


export default () => {};
