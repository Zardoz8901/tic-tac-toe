const initGameboard = () => {
  const gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  return gameBoard;
};

const initMoveTracker = () => {
  const moveTracker = [];
  return moveTracker;
};

const insertMove = (gameBoard: number[], symbol: string, position) => {
  gameBoard.splice(position, 1, symbol);
  console.log(gameBoard);
  return gameBoard;
};

const playerRotation = () => {};

const gridSelector = (moveTracker, newGame) => {
  const gridList = document.querySelectorAll("#game-grid> div");
  const gridArray = [...gridList];
  gridArray.forEach((div) => {
    div.addEventListener("click", () => {
      const gridOrigin = div.dataset.gridOrigin;
      moveTracker.push(gridOrigin);
      console.log(moveTracker);
      console.log(gridOrigin);
      return insertMove(newGame, "X", gridOrigin);
    });
  });
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
  console.log(playerOne);
  console.log(playerTwo);
  return { playerOne, playerTwo };
};

const gameFlow = (() => {
  const newGame = initGameboard();
  const moveTracker = initMoveTracker();
  gridSelector(moveTracker, newGame);
  // insertMove(newGame, "O", 1);
  playerSelect();
})();
