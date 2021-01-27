export const windowWidth = window.innerWidth;
export const windowHeight = window.innerHeight;
export const windowHalfWidth = window.innerWidth / 2;
export const windowHalfHeight = window.innerHeight / 2;

const canvas = document.querySelector(`#win-result-1`);
export const ctx = canvas.getContext(`2d`);

canvas.width = windowWidth;
canvas.height = windowHeight;
