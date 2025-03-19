// Gameboard module
const gameboard = (function () {
  // Max grid unit length and total number of cells in the grid
  const MAX_GRID_LENGTH = 3;
  const TOTAL_NUMBER_OF_CELLS = Math.pow(MAX_GRID_LENGTH, 2);

  // Grid of the board
  const grid = new Array(TOTAL_NUMBER_OF_CELLS);

  // Play "X" and "O"
  function play(atIndex, move) {
    // Valid moves RegEx
    const VALID_MOVES = /x|o/i;

    // Check if cell is previously unused and less than total number of cells
    if (
      grid[atIndex] === undefined &&
      atIndex < TOTAL_NUMBER_OF_CELLS &&
      move.match(VALID_MOVES)
    ) {
      // Replace cell with value
      grid.splice(atIndex, 1, move);
    }
  }

  // Return grid cells
  function display() {
    const displayCells = [];
    for (let cell of grid) {
      if (cell === undefined) {
        displayCells.push(" ");
      } else {
        displayCells.push(cell);
      }
    }

    return displayCells;
  }

  // Reset grid
  function reset() {
    for (let i = 0; i < TOTAL_NUMBER_OF_CELLS; i++) {
      grid.splice(i, 1, undefined);
    }
  }

  return { play, display, reset };
})();

gameboard.play(3, "x");
gameboard.play(8, "O");

console.log(gameboard.display());

gameboard.reset();

console.log(gameboard.display());
