import * as THREE from 'three';
import Pyramid from './pyramid';
import Lantern from './lantern';
import {getSvgObject} from './svg-loader';
import {setMeshParams} from '../common';
import {secondStoryConfig} from '../configStory';


class StoryPyramid extends THREE.Group {
  constructor() {
    super();

    this.constructChildren = this.constructChildren.bind(this);
    this.constructChildren();
  }

  constructChildren() {
    this.addLantern();
    this.addLeaf();
    this.addPyramid();
  }

  async addLeaf() {
    const svgObject = await getSvgObject();
    const leaf = svgObject.getObject(`leaf-2`);
    setMeshParams(leaf, secondStoryConfig.leaf);

    this.add(leaf);
  }

  addPyramid() {
    const pyramid = new Pyramid();
    setMeshParams(pyramid, secondStoryConfig.pyramid);

    this.add(pyramid);
  }

  addLantern() {
    const lantern = new Lantern(this.getMaterial);
    setMeshParams(lantern, secondStoryConfig.lantern);

    this.add(lantern);
  }
}

export default StoryPyramid;
