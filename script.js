// Gameboard module
const Gameboard = (function (MAX_LENGTH) {
  // Total number of cells in the gameboard
  const numberOfCells = Math.pow(MAX_LENGTH, 2);

  // Initialise gameboard with new cell objects
  const gameboardCells = [];
  for (let cellIndex = 0; cellIndex < numberOfCells; cellIndex++) {
    gameboardCells.push(newGameboardCell());
  }

  // Play "X" and "O"
  function playOnCell(cellIndex, playerMarker) {
    // Check valid index
    if (cellIndex < numberOfCells) {
      // Get cell instance
      const cell = gameboardCells[cellIndex];

      // Mark cell with value
      cell.markCell(playerMarker);
    }
  }

  // Return current gameboard cells
  function getCells() {
    let cells = gameboardCells.map(__gameboardCellsWithMark);

    // Return gameboard cells
    return cells;
  }

  function __gameboardCellsWithMark(gameboardCell, cellIndex) {
    const cellNumber = cellIndex + 1;
    const cellMark = gameboardCell.getMark() ? gameboardCell.getMark() : " ";

    return `${cellNumber}: ${cellMark}`;
  }

  // Reset gameboard
  function resetCellMarks() {
    for (const cell of gameboardCells) {
      cell.resetCell();
    }
  }

  return { playOnCell, getCells, resetCellMarks };
})(3);

// Gameboard cell object
function newGameboardCell() {
  let cellMark = "";
  const VALID_MARKERS = /x|o/i;

  // Change mark (here, valid marks are 0, 1, and 2)
  function markCell(playerMarker) {
    if (!cellMark && playerMarker.match(VALID_MARKERS)) {
      cellMark = playerMarker.toUpperCase();
    }
  }

  // Get current cell value
  function getMark() {
    return cellMark;
  }

  // Reset cell
  function resetCell() {
    if (cellMark) {
      cellMark = "";
    }
  }

  return { markCell, getMark, resetCell };
}

// New player object
function newPlayer(playerName, index) {
  const name = playerName;
  let playerMarker = "";

  // Assign player mark using index
  if (index === 0) {
    playerMarker = "X";
  } else if (index === 1) {
    playerMarker = "O";
  }

  // Get player
  function getName() {
    return name;
  }

  // Play on the gameboard
  function markOnGameboardCell(cellIndex) {
    if (playerMarker) {
      Gameboard.playOnCell(cellIndex, playerMarker);
    }
  }

  return { getName, markOnGameboardCell };
}

let player1 = newPlayer("jhon", 0);
let player2 = newPlayer("alex", 1);

player1.markOnGameboardCell(3);
player2.markOnGameboardCell(8);
player1.markOnGameboardCell(4);
player2.markOnGameboardCell(4);

console.log(Gameboard.getCells());

Gameboard.resetCellMarks();

console.log(Gameboard.getCells());
