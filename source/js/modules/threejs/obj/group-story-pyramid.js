import * as THREE from 'three';
import Pyramid from './pyramid';
import Lantern from './lantern';


class StoryPyramid extends THREE.Group {
  constructor() {
    super();

    this.constructChildren = this.constructChildren.bind(this);

    this.constructChildren();
  }

  constructChildren() {
    this.addPyramid();
    this.addLantern();
  }

  addPyramid() {
    const pyramid = new Pyramid();
    pyramid.scale.set(1.2, 1, 1.2);

    pyramid.rotation.copy(new THREE.Euler(10 * THREE.Math.DEG2RAD, 3 * THREE.Math.DEG2RAD, 0), `XYZ`);
    pyramid.position.set(-15, 70, -110);


    this.add(pyramid);
  }

  addLantern() {
    const lantern = new Lantern();

    lantern.scale.set(0.46, 0.46, 0.46);
    lantern.rotation.copy(new THREE.Euler(12 * THREE.Math.DEG2RAD, 60 * THREE.Math.DEG2RAD, 0), `XYZ`);
    lantern.position.set(170, -98, 10);
    this.add(lantern);
  }
}

export default StoryPyramid;
