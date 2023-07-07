const initGameboard = () => {
  const gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  return gameBoard;
};

const insertMove = (gameBoard: number[], symbol: string, position: number) => {
  gameBoard.splice(position, position, symbol);
  console.log(gameBoard);
};

const playerSelect = () => {
  const initPlayer = (playerNumber: number) => {
    const playOrder = playerNumber;
    const name = "Player" + playerNumber;
    const symbol = "Cross";
    if (playerNumber === 2) {
      const symbol = "Nought";
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
  insertMove(newGame, "X", 8);
  playerSelect();
})();
