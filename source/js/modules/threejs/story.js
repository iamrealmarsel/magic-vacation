import * as THREE from 'three';
import vertexStory from './vertexStory.glsl';
import fragmentStory from './fragmentStory.glsl';
import {animateEasingWithFPS} from '../../helpers/animate';
import {bezierEasing} from '../../helpers/cubic-bezier';
import StoryPyramid from './obj/group-story-pyramid';
import StorySnowman from './obj/group-story-snowman';
import StoryDog from './obj/group-story-dog';

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const windowHalfWidth = window.innerWidth / 2;
const windowHalfHeight = window.innerHeight / 2;
const canvasStory = document.querySelector(`#canvasStory`);

const easeInOut = bezierEasing(0.41, 0, 0.54, 1);
const hueIntensityEasingFn = (timingFraction) => {
  return easeInOut(Math.sin(timingFraction * Math.PI));
};

const sceneParams = {
  fov: 35,
  aspect: windowWidth / windowHeight,
  near: 0.1,
  far: 1000,
  position: {
    z: 750
  }
};

const manager = new THREE.LoadingManager();
const loader = new THREE.TextureLoader(manager);

const camera = new THREE.PerspectiveCamera(sceneParams.fov, sceneParams.aspect, sceneParams.near, sceneParams.far);
camera.position.z = sceneParams.position.z;
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({canvas: canvasStory});

// const geometrySphere = new THREE.SphereGeometry(100, 50, 50);
// const materialSphere = new THREE.MeshStandardMaterial({
//   color: 0xFFFFFF,
//   metalness: 0.05,
//   emissive: 0x0,
//   roughness: 0.5
// });
// const meshSphere = new THREE.Mesh(geometrySphere, materialSphere);

const lights = [
  {
    id: `DirectionalLight`,
    type: `DirectionalLight`,
    color: `rgb(255,255,255)`,
    intensity: 0.84,
    position: {x: 0, y: sceneParams.position.z * Math.tan(-15 * THREE.Math.DEG2RAD), z: sceneParams.position.z},
  },
  {
    id: `PointLight1`,
    type: `PointLight`,
    color: `rgb(246,242,255)`,
    intensity: 0.60,
    decay: 2.0,
    distance: 975,
    position: {x: -785, y: -350, z: 710},
  },
  {
    id: `PointLight2`,
    type: `PointLight`,
    color: `rgb(245,254,255)`,
    intensity: 0.95,
    decay: 2.0,
    distance: 975,
    position: {x: 730, y: 800, z: 985},
  },
];

const light = getLight();
light.position.z = camera.position.z;


const slides = [
  {
    texture: loader.load(`/img/scene-1.png`),
    options: {hueShift: 0.0, distort: false},
    models: new StoryDog(),
  },
  {
    texture: loader.load(`/img/scene-2.png`),
    options: {
      hueShift: -0.3,
      distort: true
    },
    animations: {
      hue: {
        initial: -0.1,
        final: -0.3,
        duration: 3000,
        variation: 0.4,
      },
    },
    models: new StoryPyramid(),
  },
  {
    texture: loader.load(`/img/scene-3.png`),
    options: {hueShift: 0.0, distort: false},
    models: new StorySnowman(),
  },
  {
    texture: loader.load(`/img/scene-4.png`),
    options: {hueShift: 0.0, distort: false}
  },
];

const bubbleDuration = 2100;
const glareOffset = 0.8;
const startRadianAngle = 1.96;
const endRadianAngle = 2.75;

const bubbles = [
  {
    radius: 80.0,
    initialPosition: [windowHalfWidth, -100],
    position: [windowHalfWidth - windowHalfWidth / 10, -100],
    finalPosition: [windowHalfWidth - windowHalfWidth / 10, windowHeight + 100],
    positionAmplitude: 60,
    glareOffset,
    glareAngleStart: startRadianAngle,
    glareAngleEnd: endRadianAngle,
    timeout: 0.05
  },
  {
    radius: 60.0,
    initialPosition: [windowHalfWidth - windowWidth / 6, -100],
    position: [windowHalfWidth - windowWidth / 6, -100],
    finalPosition: [windowHalfWidth - windowWidth / 6, windowHeight + 100],
    positionAmplitude: 40,
    glareOffset,
    glareAngleStart: startRadianAngle,
    glareAngleEnd: endRadianAngle,
    timeout: 0.70
  },
  {
    radius: 40.0,
    initialPosition: [windowHalfWidth + 150, -100],
    position: [windowHalfWidth + 150, -100],
    finalPosition: [windowHalfWidth + 150, windowHeight + 100],
    positionAmplitude: 30,
    glareOffset,
    glareAngleStart: startRadianAngle,
    glareAngleEnd: endRadianAngle,
    timeout: 0.90
  },
];

let geoWidth = 2048;
let geoHeight = 1024;
let configMaterial = {};
let bubblesValue = 0;
let time = {
  value: bubblesValue,
};

function loadStory() {
  manager.onLoad = () => {
    slides.forEach(({texture, options, models}, index) => {

      configMaterial = {
        uniforms: {
          map: {
            value: texture,
          },
          options: {
            value: options,
          },
          time,
          ...addBubble(index),
        },
        vertexShader: vertexStory,
        fragmentShader: fragmentStory,
      };

      const material = new THREE.RawShaderMaterial(configMaterial);

      material.needsUpdate = true;

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

      const slide = new THREE.Mesh(geometry, material);
      slide.position.set(geoWidth * index, 0, 0);

      scene.add(slide);
      // scene.add(meshSphere);
      scene.add(light);

      if (models) {
        models.position.x = geoWidth * index;
        scene.add(models);
      }
    });

    renderer.setSize(windowWidth, windowHeight);
    renderer.render(scene, camera);
  };
}

function moveCameraX(activeIndex) {
  camera.position.x = geoWidth * activeIndex;
  renderer.render(scene, camera);

  if (slides[activeIndex].animations) {
    animateHueShift(activeIndex);
    animateBubbles();
  }
}

function animateBubbles() {
  if (configMaterial.uniforms.time.value < bubbleDuration / 1000) {
    configMaterial.uniforms.time.value += 0.01;
    requestAnimationFrame(animateBubbles);
  }
}

function animateHueShift(activeIndex) {
  const {initial, final, duration, variation} = slides[activeIndex].animations.hue;
  const offset = (Math.random() * variation * 2 + (1 - variation));
  animateEasingWithFPS(hueShiftIntensityAnimationTick(activeIndex, initial, final * offset), duration, hueIntensityEasingFn)
  .then(() => animateHueShift(activeIndex));
}

function hueShiftIntensityAnimationTick(index, from, to) {
  return (progress) => {
    const hueShift = from + progress * (to - from);
    slides[index].options.hueShift = hueShift;
    renderer.setSize(windowWidth, windowHeight);
    renderer.render(scene, camera);
  };
}

function getLight() {
  const lightGroup = new THREE.Group();

  lights.forEach((lightItem) => {
    const color = new THREE.Color(lightItem.color);

    const lightUnit = new THREE[lightItem.type](color, lightItem.intensity, lightItem.distance, lightItem.decay);
    lightUnit.position.set(...Object.values(lightItem.position));
    lightGroup.add(lightUnit);
  });

  return lightGroup;
}

function addBubble(index) {
  if (slides[index].options.distort) {
    return {
      distortion: {
        value: {
          bubbles,
          resolution: [windowWidth, windowHeight],
        }
      },
    };
  }

  return {};
}


export {loadStory, moveCameraX};
