/* 
  Gameboard module
 */
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
      const actionResult = cell.markCell(playerMarker);

      if (actionResult) {
        return true;
      }
    }

    return false;
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

/* 
  Gameboard cell object
*/
function newGameboardCell() {
  let cellMark = "";
  const VALID_MARKERS = /x|o/i;

  // Change mark (here, valid marks are 0, 1, and 2)
  function markCell(playerMarker) {
    if (!cellMark && playerMarker.match(VALID_MARKERS)) {
      cellMark = playerMarker.toUpperCase();
      return true;
    }

    return false;
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

/* 
  New player object
*/
function newPlayer(playerName, index) {
  const name = playerName;
  let playerMarker = "";
  let markedCells = [];

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
      const moveResult = Gameboard.playOnCell(cellIndex, playerMarker);

      // Check if move is valid
      if (moveResult) {
        markedCells.push(cellIndex);
        return playerMarker;
      }
    }

    return null;
  }

  // Return player's all marked cells
  function getMarkedCells() {
    return markedCells;
  }

  return { getName, markOnGameboardCell, getMarkedCells };
}

/* 
  Game controller module
*/
const GameController = (function (NUMBER_OF_PLAYERS) {
  let gamePlayers = [];
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
    const playResult = currentPlayer.markOnGameboardCell(cellIndex);

    // Check if play was valid
    if (playResult) {
      if (__hasPlayerWon(cellIndex)) {
        console.log(`${currentPlayer.getName()}(${playResult}) has won!`);

        // Reset the gameboard
        Gameboard.resetCellMarks();

        // Reset current player
        currentPlayer = gamePlayers[0];
      } else {
        // Change current player
        currentPlayer = __changePlayers(gamePlayers.indexOf(currentPlayer));
      }

      return playResult;
    }

    return null;
  }

  // Return playing players
  function getCurrentPlayers() {
    return gamePlayers;
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

  // Check if there is a winner after current player moves on a cell
  function __hasPlayerWon(cellIndexPlayed) {
    const winningLineIndices = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const currentMarkedCells = currentPlayer.getMarkedCells();

    // Check if player has marked at least 3 cells
    if (currentMarkedCells.length >= 3) {
      for (const winningLine of winningLineIndices) {
        // Check if the winning line at least includes the current index played
        if (winningLine.includes(cellIndexPlayed)) {
          // Check if all the indices of the winning line are marked by current player
          let indexMatchCount = 0;

          for (const cellIndex of winningLine) {
            if (currentMarkedCells.includes(cellIndex)) {
              indexMatchCount++;
            }
          }

          if (indexMatchCount === 3) {
            return true;
          }
        }
      }
    }

    return false;
  }

  return { setPlayers, currentPlayerMoves, getCurrentPlayers };
})(2); // Play with two players

/* 
  Screen controller model
*/
const ScreenController = (function () {
  const display = document.querySelector("#display-container");
  // Set start display
  display.textContent = "Start new game.";

  const gameboard = document.querySelector("#gameboard-container");
  const gameboardCells = gameboard.childNodes;

  // Insert gameboard cell div elements inside gameboard
  for (const cell of Gameboard.getGameboardCells()) {
    const gameboardCellElement = document.createElement("div");

    gameboardCellElement.setAttribute(
      "data-gameboard-cell-index",
      Gameboard.getGameboardCells().indexOf(cell)
    );
    gameboardCellElement.classList.add("gameboard-cell");

    gameboard.append(gameboardCellElement);
  }

  // Add new game click event
  const newGameActionBtn = document.querySelector("#new-game-btn");

  // Players
  let player1 = "X-player";
  let player2 = "O-player";

  // TODO: Player name form popup

  // Start the game
  GameController.setPlayers([player1, player2]);

  // Add event listeners for each gameboard cell
  gameboardCells.forEach(function (cell) {
    cell.addEventListener("click", function (e) {
      const cellIndex = parseInt(
        cell.getAttribute("data-gameboard-cell-index")
      );

      const validCurrentMarker = GameController.currentPlayerMoves(cellIndex);

      if (validCurrentMarker) {
        cell.textContent = validCurrentMarker;
      }
    });
  });
})();
