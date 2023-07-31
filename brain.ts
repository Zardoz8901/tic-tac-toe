const initGameboard = () => {
  const gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  return gameBoard;
};

const initMoveTracker = () => {
  const moveTracker = [];
  return moveTracker;
};

const playerSelect = () => {
  const initPlayer = (playerNumber: number) => {
    const playOrder = playerNumber;
    const name = "Player" + playerNumber;
    const symbol = "X";
    if (playerNumber === 2) {
      const symbol = "O";
      return { name, symbol, playOrder };
    }
    return { name, symbol, playOrder };
  };
  const playerOne = initPlayer(1);
  const playerTwo = initPlayer(2);
  return { playerOne, playerTwo };
};

const insertMove = (gameBoard: number[], symbol: string, position) => {
  const players = playerSelect();
  const player1 = players.playerOne;
  const player2 = players.playerTwo;
  console.log(player1, player2);
  //position.textContent(`${symbol}`);
  gameBoard.splice(position, 1, symbol);
  console.log(gameBoard);
  return gameBoard;
};

const gridSelector = (moveTracker, newGame) => {
  const gridList = document.querySelectorAll("#game-grid> div");
  const gridArray = [...gridList];
  gridArray.forEach((div) => {
    div.addEventListener("click", () => {
      console.log(div);
      const gridOrigin = div.dataset.gridOrigin;
      moveTracker.push(gridOrigin);
      // implement player turn rotation
      let symbol = "X";
      if (moveTracker.length % 2 === 0) {
        symbol = "O";
      }
      //  inject player symbol
      div.textContent = symbol;
      return insertMove(newGame, symbol, gridOrigin);
    });
  });
};

const gameFlow = (() => {
  const newGame = initGameboard();
  const moveTracker = initMoveTracker();
  gridSelector(moveTracker, newGame);
  // insertMove(newGame, "O", 1);
  playerSelect();
})();
