// Gameboard module
const Gameboard = (function (MAX_LENGTH) {
  // Total number of cells in the gameboard
  const numberOfCells = Math.pow(MAX_LENGTH, 2);

  // Initialise gameboard with new cell objects
  const board = [];
  for (let cell = 0; cell < numberOfCells; cell++) {
    board.push(newGameboardCell());
  }

  // Play "X" and "O"
  function play(atIndex, withMarker) {
    // Check valid index
    if (atIndex < numberOfCells) {
      // Get cell instance
      const cell = board[atIndex];

      // Check if cell is unmarked
      if (!cell.hasMark()) {
        // Mark cell with value
        cell.markCell(withMarker);
      }
    }
  }

  // Return current gameboard cells
  function display() {
    console.log("Current gameboard:");
    let displayString = "";

    // Create display string
    board.forEach(function (cell, cellIndex) {
      // Make rows by inserting line breaks
      if (cellIndex !== 0 && cellIndex % MAX_LENGTH === 0) {
        displayString += "\n";
      }

      // Check if cell is marked
      if (cell.hasMark()) {
        displayString += cell.getMark() + " ";
      } else {
        displayString += "_ ";
      }
    });

    // Display gameboard
    console.log(displayString);
  }

  // Reset gameboard
  function reset() {
    for (const cell of board) {
      cell.resetCell();
    }
  }

  return { play, display, reset };
})(3);

// Gameboard cell object
function newGameboardCell() {
  let mark = "";
  const VALID_MARKERS = /x|o/i;

  // Change mark (here, valid marks are 0, 1, and 2)
  function markCell(marker) {
    if (marker.match(VALID_MARKERS)) {
      mark = marker.toUpperCase();
    }
  }

  // Check if cell is marked
  function hasMark() {
    if (mark) {
      return true;
    }

    return false;
  }

  // Get current cell value
  function getMark() {
    if (this.hasMark) {
      return mark;
    }
  }

  // Reset cell
  function resetCell() {
    if (this.hasMark) {
      mark = "";
    }
  }

  return { markCell, hasMark, getMark, resetCell };
}

Gameboard.play(3, "x");
Gameboard.play(8, "o");

Gameboard.display();

Gameboard.reset();

Gameboard.display();
