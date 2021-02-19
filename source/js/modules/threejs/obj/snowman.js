import * as THREE from 'three';

class Snowman extends THREE.Group {
  constructor() {
    super();

    this.topSphere = {
      radius: 44,
      segments: 20,
      color: `#bccde6`,
    };

    this.cone = {
      radius: 18,
      height: 75,
      radialSegments: 20,
      color: `#c44717`,
    };

    this.baseSphere = {
      radius: 75,
      segments: 20,
      color: `#bccde6`,
    };

    this.addBase = this.addBase.bind(this);
    this.addTop = this.addTop.bind(this);
    this.constructChildren = this.constructChildren.bind(this);

    this.constructChildren();
  }

  getMaterial(options = {}) {
    const {color} = options;

    return new THREE.MeshPhongMaterial({
      color: new THREE.Color(color),
    });
  }

  constructChildren() {
    this.addBase();
    this.addTop();
  }

  addBase() {
    const sphere = new THREE.SphereGeometry(this.baseSphere.radius, this.baseSphere.segments, this.baseSphere.segments);
    const sphereMesh = new THREE.Mesh(sphere, this.getMaterial({color: this.baseSphere.color}));

    this.add(sphereMesh);
  }

  addTop() {
    this.top = new THREE.Group();

    const sphere = new THREE.SphereGeometry(this.topSphere.radius, this.topSphere.segments, this.topSphere.segments);
    const sphereMesh = new THREE.Mesh(sphere, this.getMaterial({color: this.topSphere.color}));

    const cone = new THREE.ConeGeometry(this.cone.radius, this.cone.height, this.cone.radialSegments);
    const coneMesh = new THREE.Mesh(cone, this.getMaterial({color: this.cone.color}));

    this.top.add(sphereMesh);
    this.top.add(coneMesh);

    sphereMesh.position.set(0, 105, 0);

    coneMesh.rotation.x = 90 * THREE.Math.DEG2RAD;
    coneMesh.position.set(0, 105, 43);

    this.add(this.top);
  }
}

export default Snowman;
