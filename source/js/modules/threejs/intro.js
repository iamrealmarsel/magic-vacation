import * as THREE from 'three';
import vertexIntro from './vertexIntro.glsl';
import fragmentIntro from './fragmentIntro.glsl';
import {getLightsConfig, modelsConfig} from './configIntro';
// import {getSvgObject} from './obj/svg-loader';
// import {loadModel} from './3d/load-object-model';
// import {setMeshParams, getMaterial} from './common';
import introObjects from './introObjects';


const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const windowHalfWidth = window.innerWidth / 2;
const windowHalfHeight = window.innerHeight / 2;
const canvasIntro = document.querySelector(`#canvasIntro`);

// const models = modelsConfig.models;

const sceneParams = {
  fov: 45,
  aspect: windowWidth / windowHeight,
  near: 0.1,
  far: 1405,
  position: {
    z: 1405
  }
};

const intro = new introObjects();

const lights = getLightsConfig(sceneParams);
const light = getLightGroup();

const manager = new THREE.LoadingManager();
const loader = new THREE.TextureLoader(manager);
const texture = loader.load(`/img/scene.png`);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(sceneParams.fov, sceneParams.aspect, sceneParams.near, sceneParams.far);
camera.position.z = sceneParams.position.z;
// camera.fov = fov();

const renderer = new THREE.WebGLRenderer({canvas: canvasIntro});

intro.position.z = camera.position.z * 0.5;
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

    // loadModels();
    // scene.add(bgIntro);
    scene.add(intro);
    scene.add(light);

    renderer.setSize(windowWidth, windowHeight);
    renderer.render(scene, camera);
  };
};


function fov() {
  if (windowWidth > windowHeight) {
    return 35;
  }

  return (32 * windowHeight) / Math.min(windowWidth * 1.3, windowHeight);
}

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

// function loadModels() {
//   models.forEach((params) => {
//     const material = params.color && getMaterial({color: params.color, ...params.materialReflectivity});

//     loadModel(params, material, (mesh) => {
//       mesh.name = params.name;
//       mesh.scale.set(params.scale, params.scale, params.scale);
//       mesh.position.set(...Object.values(params.position));
//       mesh.rotation.copy(new THREE.Euler(params.rotate.x * THREE.Math.DEG2RAD, params.rotate.y * THREE.Math.DEG2RAD,
//           params.rotate.z * THREE.Math.DEG2RAD, params.rotationOrder || `XYZ`));
//       scene.add(mesh);
//     });
//   });
// }

// async function loadSvgs() {
//   const svgObject = await getSvgObject();
//   svgsConfig.forEach((params) => {
//     const mesh = svgObject.getObject(params.name);
//     setMeshParams(mesh, params);
//     scene.add(mesh);
//   });
//   renderer.render(scene, camera);
// }
