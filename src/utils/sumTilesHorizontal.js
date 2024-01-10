import { Tile } from '../Tile';

/**
 * @param {Tile[]} tiles
 */
export function sumToRight(tiles) {
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
  while (size < 4) {
    newRow.push(null);
    size++;
  }

  return newRow.toReversed();
}

/**
 * @param {Tile[]} tiles
 */
export function sumToLeft(tiles) {
  // Push all array items to the left
  const sortedRow = tiles.toSorted((a, b) => {
    if (a == null && b != null) {
      return 1;
    }
    if (a != null && b == null) {
      return -1;
    }
    return 0;
  });

  // Reverse sorted array and sum pairs of equal-valued tiles
  let i = 0;
  const newRow = sortedRow.reduce((output, current) => {
    if (current) {
      if (!output.length || current.value !== output[i - 1].value) {
        current.j = i;
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
  while (size < 4) {
    newRow.push(null);
    size++;
  }

  return newRow;
}
