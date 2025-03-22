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
  function getGameboardCells() {
    // Return gameboard cells
    return gameboardCells;
  }

  // Reset gameboard
  function resetCellMarks() {
    for (const cell of gameboardCells) {
      cell.resetCell();
    }
  }

  return { playOnCell, getGameboardCells, resetCellMarks };
})(3); // Play with 3*3 grid board

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

// Game controller module
const GameController = (function (NUMBER_OF_PLAYERS) {
  const gamePlayers = [];
  let currentPlayer;

  // Set players list
  function setPlayers(playerNames) {
    if (playerNames.length === NUMBER_OF_PLAYERS) {
      for (const player of playerNames) {
        gamePlayers.push(newPlayer(player, playerNames.indexOf(player)));
      }

      // Set first player to start
      currentPlayer = gamePlayers[0];
    }
  }

  // Control player moves
  function currentPlayerMoves(cellIndex) {
    currentPlayer.markOnGameboardCell(cellIndex);

    // Change current player
    currentPlayer = __changePlayers(gamePlayers.indexOf(currentPlayer));
  }

  // Switch current player slection
  function __changePlayers(currentPlayerIndex) {
    const nextPlayer = gamePlayers[currentPlayerIndex + 1];

    // Check if next player exists
    if (nextPlayer) {
      return nextPlayer;
    }

    // Return first player
    return gamePlayers[0];
  }

  return { setPlayers, currentPlayerMoves };
})(2); // Play with two players

GameController.setPlayers(["jhon", "alex"]);

GameController.currentPlayerMoves(3);
GameController.currentPlayerMoves(8);
GameController.currentPlayerMoves(4);
GameController.currentPlayerMoves(5);

Gameboard.resetCellMarks();
