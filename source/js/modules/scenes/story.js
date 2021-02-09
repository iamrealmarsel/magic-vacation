import * as THREE from 'three';

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const windowHalfWidth = window.innerWidth / 2;
const windowHalfHeight = window.innerHeight / 2;
const canvasStory = document.querySelector(`#canvasStory`);

const manager = new THREE.LoadingManager();
const loader = new THREE.TextureLoader(manager);

const camera = new THREE.OrthographicCamera(-windowHalfWidth, windowHalfWidth, windowHalfHeight, -windowHalfHeight, 0, 1);
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({canvas: canvasStory});

const textures = [
  loader.load(`/img/scene-1.png`),
  loader.load(`/img/scene-2.png`),
  loader.load(`/img/scene-3.png`),
  loader.load(`/img/scene-4.png`),
];

let geoWidth = 2048;
let geoHeight = 1024;

export const loadStory = () => {
  manager.onLoad = () => {
    textures.forEach((item, index) => {
      const material = new THREE.MeshBasicMaterial({
        map: item,
      });

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
    });

    renderer.setSize(windowWidth, windowHeight);
    renderer.render(scene, camera);
  };
};

export const moveCameraX = (activeIndex) => {
  camera.position.x = geoWidth * activeIndex;
  renderer.render(scene, camera);
};

