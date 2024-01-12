import { Tile } from '../Tile';

const directionMap = {
  up: 'i',
  down: 'i',
  left: 'j',
  right: 'j',
};

/**
 * @param {Tile[]} tiles
 * @param {'right' | 'down'} direction
 */
export function sumArrayToRight(tiles, direction = 'right') {
  const axis = directionMap[direction];

  // Push all array items to the right
  const sortedRow = tiles.toSorted((a, b) => {
    if (a == null && b != null) {
      return -1;
    }
    if (a != null && b == null) {
      return 1;
    }
    return 0;
  });

  // Reverse sorted array and sum pairs of equal-valued tiles
  let i = 3;
  const newRow = sortedRow.reduceRight((output, current, _, arr) => {
    if (current) {
      if (!output.length || current.value !== output[0].value) {
        current[axis] = i;
        output.unshift(current);
        i--;
      } else if (current.value === output[0].value) {
        output[0].value *= 2;
      }
    }

    return output;
  }, []);

  while (newRow.length < 4) {
    newRow.unshift(null);
  }

  return newRow;
}

/**
 * @param {Tile[]} tiles
 * @param {'left' | 'up'} direction
 */
export function sumArrayToLeft(tiles, direction = 'left') {
  const axis = directionMap[direction];

  // Push all array items to the left
  const sortedTiles = tiles.toSorted((a, b) => {
    if (a == null && b != null) {
      return 1;
    }
    if (a != null && b == null) {
      return -1;
    }
    return 0;
  });

  // Sum pairs of equal-valued tiles
  let i = 0;
  const newTiles = sortedTiles.reduce((output, current) => {
    if (current) {
      if (!output.length || current.value !== output[i - 1].value) {
        current[axis] = i;
        output.push(current);
        i++;
      } else if (current.value === output[i - 1].value) {
        output[i - 1].value *= 2;
      }
    }

    return output;
  }, []);

  // Pad end array with null
  let size = newTiles.length;
  while (size < 4) {
    newTiles.push(null);
    size++;
  }

  return newTiles;
}
