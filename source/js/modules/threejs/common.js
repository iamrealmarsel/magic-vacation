import * as THREE from 'three';

export const getMaterial = (options = {}) =>{
  const {color, ...other} = options;

  return new THREE.MeshPhongMaterial({
    color: new THREE.Color(color),
    ...other,
  });
};

export const setMeshParams = (mesh, params) => {
  if (params.position) {
    mesh.position.set(...Object.values(params.position));
  }
  if (typeof params.scale === `number`) {
    mesh.scale.set(params.scale, params.scale, params.scale);
  }
  if (typeof params.scale === `object`) {
    mesh.scale.set(...Object.values(params.scale));
  }
  if (params.rotate) {
    mesh.rotation.copy(new THREE.Euler(
        params.rotate.x * THREE.Math.DEG2RAD,
        params.rotate.y * THREE.Math.DEG2RAD,
        params.rotate.z * THREE.Math.DEG2RAD,
        params.rotationOrder || `XYZ`)
    );
  }
};

export const getLathePointsForCircle = (borderWidth, height, radius) => {
  const points = [];

  for (let i = radius; i <= radius + borderWidth; i++) {
    for (let j = 1; j <= height; j++) {
      points.push(new THREE.Vector2(i, j));
    }
  }

  return points;
};

export const getLatheDegrees = (degStart, degEnd) => {
  const start = THREE.Math.DEG2RAD * degStart;
  const length = THREE.Math.DEG2RAD * (degEnd - degStart);

  return {start, length};
};
