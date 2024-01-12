import { Game } from './Game';
import { tileColorMap } from './utils/tileAttributes';

const darkText = '#766D65';
const lightText = '#F9F6F1';

/**
 *
 * @param {string} text
 */
function getFontSize(text) {
  if (text.length >= 7) {
    return '22';
  }
  if (text.length === 6) {
    return '30';
  }

  return '38';
}

export class Tile {
  /**
   * @param {Game} game
   * @param {number} i
   * @param {number} j
   */
  constructor(game, i, j) {
    this.game = game;
    this.i = i;
    this.j = j;
    this.new_i = i;
    this.new_j = j;
    this.speed = 0.1;

    // Initial value
    this.value = 2;
  }

  update() {
    if (this.i !== this.new_i) {
      this.i += (this.new_i - this.i) * this.speed;
    }
    if (this.j !== this.new_j) {
      this.j += (this.new_j - this.j) * this.speed;
    }
  }

  /**
   * @param {CanvasRenderingContext2D} context
   */
  draw(context) {
    const x = this.j * this.game.squareSide + this.game.padding;
    const y = this.i * this.game.squareSide + this.game.padding;

    context.beginPath();
    context.fillStyle = tileColorMap[this.value] ?? tileColorMap[0];
    context.roundRect(x, y, this.game.squareSide - this.game.padding, this.game.squareSide - this.game.padding, 4);
    context.fill();

    const fontSize = getFontSize(String(this.value));
    context.font = `${fontSize}px sans-serif`;
    context.textBaseline = 'middle';
    context.textAlign = 'center';

    context.fillStyle = darkText;
    context.fillText(
      this.value,
      x + (this.game.squareSide - this.game.padding) / 2,
      y + (this.game.squareSide - this.game.padding) / 2
    );
  }
}
