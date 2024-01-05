import { Tile } from './Tile';

export class Game {
  /**
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.padding = 15;
    this.squareSide = (canvas.width - this.padding) / 4;
    // console.log(this.squareSide - 15);

    /**
     * @type {CanvasRenderingContext2D}
     */
    this.context = canvas.getContext('2d');
  }

  render() {
    // Draw board
    this.context.fillStyle = '#d6d6d6';

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        this.context.beginPath();
        this.context.roundRect(
          i * this.squareSide + this.padding,
          j * this.squareSide + this.padding,
          this.squareSide - this.padding,
          this.squareSide - this.padding,
          4
        );
        this.context.fill();
      }
    }

    const tile = new Tile(this, 1, 1);
    tile.draw(this.context);
  }
}
