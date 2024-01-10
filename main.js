import './style.css';

import { Game } from './src/Game';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;

const game = new Game(canvas);
let lastTime = 0;

/**
 * @param {number} timestamp - Delta time
 */
function animate(timestamp) {
  const dt = timestamp - lastTime;
  lastTime = timestamp;
  game.render(context, dt);
  requestAnimationFrame(animate);
}

animate(0);
