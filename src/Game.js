import { Tile } from './Tile';
import { sumToLeft, sumToRight } from './utils/sumTilesHorizontal';

export class Game {
  /**
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.padding = 15;
    this.squareSide = (canvas.width - this.padding) / 4;
    this.tiles = [
      Array.from({ length: 4 }, () => null),
      Array.from({ length: 4 }, () => null),
      Array.from({ length: 4 }, () => null),
      Array.from({ length: 4 }, () => null),
    ];
    this.keyPressed = null;

    // Add 2 random tiles
    this.tiles[1][0] = new Tile(this, 1, 0);
    this.tiles[1][1] = new Tile(this, 1, 1);
    this.tiles[1][2] = new Tile(this, 1, 2);
    this.tiles[1][3] = new Tile(this, 1, 3);
    // this.addTile();
    // this.addTile();
    console.log(this.tiles);

    // Events
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        this.keyPressed = 'up';
      }
      if (e.key === 'ArrowRight') {
        this.keyPressed = 'right';
      }
      if (e.key === 'ArrowDown') {
        this.keyPressed = 'down';
      }
      if (e.key === 'ArrowLeft') {
        this.keyPressed = 'left';
      }
      // this.addTile();
      // console.log(this.tiles);
    });
  }

  generateValidCoords() {
    let row = -1;
    let column = -1;

    while (row < 0 || column < 0 || this.tiles[row][column]) {
      row = Math.floor(Math.random() * 4);
      column = Math.floor(Math.random() * 4);
    }

    return [row, column];
  }

  addTile() {
    const [row, column] = this.generateValidCoords();

    this.tiles[row][column] = new Tile(this, row, column);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} context
   */
  render(context, dt) {
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Draw board
    context.fillStyle = '#d6d6d6';

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        context.beginPath();
        context.roundRect(
          i * this.squareSide + this.padding,
          j * this.squareSide + this.padding,
          this.squareSide - this.padding,
          this.squareSide - this.padding,
          4
        );
        context.fill();
      }
    }

    // Update tiles positions
    switch (this.keyPressed) {
      case 'right':
        this.tiles = this.tiles.map((row) => sumToRight(row));
        this.keyPressed = null;
        break;
      case 'left':
        this.tiles = this.tiles.map((row) => sumToLeft(row));
        this.keyPressed = null;
        break;
    }

    // Draw playing tiles
    this.tiles.forEach((row) => {
      for (const tile of row) {
        if (tile) {
          tile.draw(context);
          // tile.update(dt);
        }
      }
    });
  }
}
