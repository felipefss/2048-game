import { Tile } from './Tile';

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
    // this.tiles[1][0] = new Tile(this, 1, 0);
    // this.tiles[1][1] = new Tile(this, 1, 1);
    // this.tiles[1][2] = new Tile(this, 1, 2);
    this.addTile();
    this.addTile();
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
    if (this.keyPressed === 'right') {
      // TODO: Put this in a separate file
      for (let row = 0; row < this.tiles.length; row++) {
        // Push all array items to the right
        const sortedRow = this.tiles[row].toSorted((a, b) => {
          if (a == null && b != null) {
            return -1;
          }
          if (a != null && b == null) {
            return 1;
          }
          return 0;
        });

        // Reverse sorted array and sum pairs of equal-valued tiles
        let i = 0;
        const newRow = sortedRow.toReversed().reduce((output, current, _, arr) => {
          if (current) {
            if (!output.length || current.value !== output[i - 1].value) {
              current.j = arr.length - 1 - i;
              output.push(current);
              i++;
            } else if (current.value === output[i - 1].value) {
              output[i - 1].value *= 2;
            }
          }

          return output;
        }, []);

        // Pad end array with null
        let size = newRow.length;
        while (size > 0) {
          newRow.push(null);
          size--;
        }

        this.tiles[row] = newRow.toReversed();
      }
      this.keyPressed = null;
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
