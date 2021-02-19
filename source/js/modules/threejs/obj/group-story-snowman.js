import * as THREE from 'three';
import Snowman from './snowman';


class StorySnowman extends THREE.Group {
  constructor() {
    super();

    this.addSnowman();
  }

  getMaterial(options = {}) {
    const {color, ...other} = options;

    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      ...other,
    });
  }

  addSnowman() {
    const snowman = new Snowman(this.getMaterial);

    snowman.scale.set(0.75, 0.75, 0.75);
    snowman.rotation.copy(new THREE.Euler(10 * THREE.Math.DEG2RAD, 40 * THREE.Math.DEG2RAD, 0), `XYZ`);
    snowman.position.set(-20, -110, 0);
    this.add(snowman);
  }
}

export default StorySnowman;
