import * as THREE from 'three';
import Snowman from './snowman';
import Road from './road';
import {setMeshParams} from '../common';
import {thirdStoryConfig} from '../configStory';

class StorySnowman extends THREE.Group {
  constructor() {
    super();

    this.constructChildren = this.constructChildren.bind(this);

    this.constructChildren();
  }

  constructChildren() {
    this.addSnowman();
    this.addRoad();
  }

  addSnowman() {
    const snowman = new Snowman();
    setMeshParams(snowman, thirdStoryConfig.snowman);

    this.add(snowman);
  }

  addRoad() {
    const road = new Road();
    setMeshParams(road, thirdStoryConfig.road);

    this.add(road);
  }
}

export default StorySnowman;
