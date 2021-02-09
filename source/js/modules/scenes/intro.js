import * as THREE from 'three';

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const windowHalfWidth = window.innerWidth / 2;
const windowHalfHeight = window.innerHeight / 2;
const canvasIntro = document.querySelector(`#canvasIntro`);
const loader = new THREE.TextureLoader();

export default () => {
  loader.load(`/img/scene.png`, (texture) => {
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearFilter;

    const material = new THREE.RawShaderMaterial({
      uniforms: {
        map: {
          value: texture
        }
      },

      vertexShader: `
      // Переменные, которые передаёт Three.js для проецирования на плоскость
      uniform mat4 projectionMatrix;
      uniform mat4 modelMatrix;
      uniform mat4 viewMatrix;

      // Атрибуты вершины из геометрии
      attribute vec3 position;
      attribute vec3 normal;
      attribute vec2 uv;

      // Varying-переменная для передачи uv во фрагментный шейдер
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );
      }`,

      fragmentShader: `
      precision mediump float;
      uniform sampler2D map;
      varying vec2 vUv;
      void main() {
        vec4 texel = texture2D( map, vUv );
        gl_FragColor = texel;
      }`,
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

    const scene = new THREE.Scene();
    scene.add(bgIntro);

    const camera = new THREE.OrthographicCamera(-windowHalfWidth, windowHalfWidth, windowHalfHeight, -windowHalfHeight, 0, 1);

    const renderer = new THREE.WebGLRenderer({canvas: canvasIntro});
    renderer.setSize(windowWidth, windowHeight);
    renderer.render(scene, camera);
  });
};
