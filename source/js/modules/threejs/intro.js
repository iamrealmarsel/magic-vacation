import * as THREE from 'three';
import vertexIntro from './vertexIntro.glsl';
import fragmentIntro from './fragmentIntro.glsl';
import {svgsConfig, getLightsConfig, objectsConfig} from './configIntro';
import {getSvgObject} from './obj/svg-loader';
import {loadModel} from './3d/load-object-model';
import {setMeshParams, getMaterial} from './common';

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const windowHalfWidth = window.innerWidth / 2;
const windowHalfHeight = window.innerHeight / 2;
const canvasIntro = document.querySelector(`#canvasIntro`);


// const setMeshParams = (mesh, params) => {
//   if (params.position) {
//     mesh.position.set(...Object.values(params.position));
//     // console.log(1);
//   }
//   if (typeof params.scale === `number`) {
//     mesh.scale.set(params.scale, params.scale, params.scale);
//     // console.log(2);
//   }
//   if (typeof params.scale === `object`) {
//     mesh.scale.set(...Object.values(params.scale));
//     // console.log(3);
//   }
//   if (params.rotate) {
//     mesh.rotation.copy(new THREE.Euler(params.rotate.x * THREE.Math.DEG2RAD, params.rotate.y * THREE.Math.DEG2RAD, params.rotate.z * THREE.Math.DEG2RAD, params.rotationOrder || `XYZ`));
//     // console.log(4);
//   }
// };

const models = objectsConfig.models;

const sceneParams = {
  fov: 45,
  aspect: windowWidth / windowHeight,
  near: 0.1,
  far: 1000,
  position: {
    z: 800
  }
};

const lights = getLightsConfig(sceneParams);
const light = getLightGroup();

const manager = new THREE.LoadingManager();
const loader = new THREE.TextureLoader(manager);
const texture = loader.load(`/img/scene.png`);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(sceneParams.fov, sceneParams.aspect, sceneParams.near, sceneParams.far);
camera.position.z = sceneParams.position.z;
const renderer = new THREE.WebGLRenderer({canvas: canvasIntro});

light.position.z = camera.position.z;

export default () => {
  manager.onLoad = () => {
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearFilter;

    const material = new THREE.RawShaderMaterial({
      uniforms: {
        map: {
          value: texture
        }
      },
      vertexShader: vertexIntro,
      fragmentShader: fragmentIntro,
    });

    let geoWidth = 1440;
    let geoHeight = 760;
    const aspectCanvas = windowWidth / windowHeight;
    const aspectImage = geoWidth / geoHeight;

    const getHeightAndDependentWidth = () => {
      geoWidth = windowHeight * aspectImage;
      geoHeight = windowHeight;
    };

    const getWidthAndDependentHeight = () => {
      geoWidth = windowWidth;
      geoHeight = windowWidth / aspectImage;
    };

    if (aspectCanvas < 1 && aspectImage > 1) {
      getHeightAndDependentWidth();
    }
    if (aspectCanvas > 1 && aspectImage < 1) {
      getWidthAndDependentHeight();
    }
    if (aspectCanvas > 1 && aspectImage > 1 && aspectCanvas < aspectImage) {
      getHeightAndDependentWidth();
    }
    if (aspectCanvas > 1 && aspectImage > 1 && aspectCanvas > aspectImage) {
      getWidthAndDependentHeight();
    }
    if (aspectCanvas < 1 && aspectImage < 1 && aspectCanvas < aspectImage) {
      getHeightAndDependentWidth();
    }
    if (aspectCanvas < 1 && aspectImage < 1 && aspectCanvas > aspectImage) {
      getWidthAndDependentHeight();
    }

    const geometry = new THREE.PlaneGeometry(geoWidth, geoHeight);
    const bgIntro = new THREE.Mesh(geometry, material);
    bgIntro.position.set(0, 0, 0);

    loadSvgs();
    loadModels();
    // scene.add(bgIntro);
    scene.add(light);

    renderer.setSize(windowWidth, windowHeight);
    renderer.render(scene, camera);
  };
};

function getLightGroup() {
  const lightGroup = new THREE.Group();

  lights.forEach((lightItem) => {
    const color = new THREE.Color(lightItem.color);

    const lightUnit = new THREE[lightItem.type](color, lightItem.intensity, lightItem.distance, lightItem.decay);
    lightUnit.position.set(...Object.values(lightItem.position));
    lightGroup.add(lightUnit);
  });

  const ambientLight = new THREE.AmbientLight(0x202020);
  lightGroup.add(ambientLight);

  return lightGroup;
}

function loadModels() {
  models.forEach((params) => {
    const material = params.color && getMaterial({color: params.color, ...params.materialReflectivity});

    loadModel(params, material, (mesh) => {
      mesh.name = params.name;
      mesh.scale.set(params.scale, params.scale, params.scale);
      mesh.position.set(...Object.values(params.position));
      mesh.rotation.copy(new THREE.Euler(params.rotate.x * THREE.Math.DEG2RAD, params.rotate.y * THREE.Math.DEG2RAD,
          params.rotate.z * THREE.Math.DEG2RAD, params.rotationOrder || `XYZ`));
      scene.add(mesh);
    });
  });
}

async function loadSvgs() {
  const svgObject = await getSvgObject();
  svgsConfig.forEach((params) => {
    const mesh = svgObject.getObject(params.name);
    setMeshParams(mesh, params);
    scene.add(mesh);
  });
  renderer.render(scene, camera);
}
