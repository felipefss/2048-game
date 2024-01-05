import './style.css';

import { Game } from './Game';

const canvas = document.querySelector('canvas');
canvas.width = 500;
canvas.height = 500;

const game = new Game(canvas);
game.render();

// function animate() {
//   requestAnimationFrame(animate);
// }

// animate();
