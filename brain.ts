const gameBoard = {
  gameBoard: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
};

const player = () => {
  const name = prompt("What hail thee far-stranger?");
  const symbol = prompt(
    ` Ah ${name} why not choose, Nought or Cross, traveler.`
  );
  const order = "Player 1";
  return { name, symbol, order };
};

const joe = player();

// function playerSelect() {
//   const players = {
//     playerName: prompt("What hail thee far-stranger?"),
//     playerSign: prompt(`Choose, Nought or Cross, traveler.`),
//   };
//   return players;
// }

// const joe = playerSelect();
// const shmoe = playerSelect();

// (function game() {
//   const play = {
//     init:,
//   };
//   return play;
// })();
