import {drawSnowLeft, drawSnowRight} from './snowflake';
import {drawSeaCalf} from './walrus';
import {drawPlane, drawStaticTree, drawDynamicTree} from './plane';
import {windowWidth, windowHeight, ctx} from './window';


export function drawAll() {
  ctx.clearRect(0, 0, windowWidth, windowHeight);

  drawPlane();
  drawStaticTree();
  drawDynamicTree();
  drawSeaCalf();
  drawSnowLeft();
  drawSnowRight();
}
