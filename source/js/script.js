import * as THREE from 'three';

// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import body from './modules/body.js';
import game from './modules/game.js';
import {animateTitle} from './modules/animation.js';
import FullPageScroll from './modules/full-page-scroll';
import bgIntro from './modules/threejs/intro';

// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();
body();
game();
bgIntro();


animateTitle(`.intro__title`, `transform`, 500, 700);
animateTitle(`.intro__date`, `transform`, 500, 700);

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

