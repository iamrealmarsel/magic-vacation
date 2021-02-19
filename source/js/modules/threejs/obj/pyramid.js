import * as THREE from 'three';

const getSquareRadius = (width) => Math.hypot(width, width) / 2;

class Pyramid extends THREE.Group {
  constructor() {
    super();

    this.params = {
      height: 280,
      radius: getSquareRadius(250),
      radialSegments: 4,
      color: `#1960cf`,
    };

    this.addPyramid = this.addPyramid.bind(this);

    this.addPyramid();
  }

  getMaterial(options = {}) {
    const {color, ...other} = options;

    return new THREE.MeshPhongMaterial({
      color: new THREE.Color(color),
      ...other
    });
  }

  addPyramid() {
    const cone = new THREE.ConeGeometry(this.params.radius, this.params.height, this.params.radialSegments);
    const mesh = new THREE.Mesh(cone, this.getMaterial({color: this.params.color, flatShading: true}));
    this.add(mesh);
  }
}

export default Pyramid;
