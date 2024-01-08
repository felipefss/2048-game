import { Game } from './Game';

const darkText = '#766D65';
const lightText = '#F9F6F1';

const tileColorMap = {
  2: '#EEE3DA',
  4: '#EDDFC8',
  8: '#F2B178',
  16: '#F59562',
  32: '#F57C5F',
  64: '#F65E3A',
  128: '#EDCF72',
  256: '#EDCC61',
  512: '#EDC750',
  1024: '#EDC53E',
  2048: '#EDC22D',
  0: '#3E3933',
};

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

    // Initial value
    this.value = 2;
  }

  update(dt) {}

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
