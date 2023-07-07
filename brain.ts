const gameBoard = () => {
  [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
};

const sanitizeString = (stringIn: string) => {
  const string = stringIn.toLowerCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
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
  const player1 = initPlayer(1);
  const player2 = initPlayer(2);
  console.log(player1);
  console.log(player2);
  return { player1, player2 };
};

const gameFlow = (() => {
  playerSelect();
  console.log(player1.name);
})();
