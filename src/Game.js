import { Tile } from './Tile';
import { sumArrayToLeft, sumArrayToRight } from './utils/sumTiles';

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
    this.keyPressed = false;
    this.timer = 0;
    const fps = 40;
    this.interval = 1000 / fps;

    // this.tiles[0][0] = new Tile(this, 0, 0);
    // this.tiles[1][0] = new Tile(this, 1, 0);
    // this.tiles[2][0] = new Tile(this, 2, 0);
    // this.tiles[3][0] = new Tile(this, 3, 0);
    // Add 2 random tiles
    this.addTile();
    this.addTile();
    // console.log(this.tiles);

    // Events
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        for (let col = 0; col < 4; col++) {
          // Map all rows for the current column
          const column = this.tiles.map((row) => row[col]);
          const newColumn = sumArrayToLeft(column, 'up');

          for (let row = 0; row < 4; row++) {
            this.tiles[row][col] = newColumn[row];
          }
        }
        this.keyPressed = true;
      }
      if (e.key === 'ArrowRight') {
        this.tiles = this.tiles.map((row) => sumArrayToRight(row));
        this.keyPressed = true;
      }
      if (e.key === 'ArrowDown') {
        for (let col = 0; col < 4; col++) {
          // Map all rows for the current column
          const column = this.tiles.map((row) => row[col]);
          const newColumn = sumArrayToRight(column, 'down');

          for (let row = 0; row < 4; row++) {
            this.tiles[row][col] = newColumn[row];
          }
        }
        this.keyPressed = true;
      }
      if (e.key === 'ArrowLeft') {
        this.tiles = this.tiles.map((row) => sumArrayToLeft(row));
        this.keyPressed = true;
      }
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
   * @param {number} dt - Delta time
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

    // Draw playing tiles
    this.tiles.forEach((row) => {
      for (const tile of row) {
        if (tile) {
          tile.draw(context);
          tile.update();
        }
      }
    });

    // Add new tile if key was pressed
    if (this.keyPressed && this.timer > this.interval) {
      this.addTile();
      this.keyPressed = false;
      this.timer = 0;
    }

    this.timer += dt;
  }
}
