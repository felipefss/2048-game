import './style.css';

import { Game } from './src/Game';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;

const game = new Game(canvas);
let lastTime = 0;

const gameOverText = document.querySelector('#game-over-text');

/**
 * @param {number} timestamp - Delta time
 */
function animate(timestamp) {
  const dt = timestamp - lastTime;
  lastTime = timestamp;
  game.render(context, dt);
  if (game.gameOver) {
    gameOverText.setAttribute('style', 'display: block');
    game.gameOver = false;
  }
  requestAnimationFrame(animate);
}

animate(0);
