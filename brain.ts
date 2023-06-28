const gameBoard = {
  gameBoard: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
};

const sanitizeString = (stringIn: string) => {
  const string = stringIn.toLowerCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const playerSelect = () => {
  const firstPlayerInit = () => {
    let name = prompt("What hail thee far-stranger?");
    name
      ? ""
      : (name = prompt("Come again, I couldn't hear you over the din?"));
    const promptSymbol = prompt(
      ` Ah ${name}, a name of potential! Now choose. Nought or Cross, traveler?`
    );
    const symbol = sanitizeString(promptSymbol);
    const turnOrder = 1;
    return { name, symbol, turnOrder };
  };
  const secondPlayerInit = (firstPlayerInit: any) => {
    const name = prompt(
      `And what is thine name, friend of ${firstPlayerInit.name} ?`
    );
    const symbolChoice = () => {
      if (firstPlayerInit.symbol === "Nought") {
        return "Cross";
      } else if (firstPlayerInit.symbol === "Cross") {
        return "Nought";
      }
    };
    alert(
      `${name}, a name best suited to the ${symbolChoice()}. Now we begin our bloody game!`
    );
    const symbol = symbolChoice();
    const turnOrder = 2;
    return { name, symbol, turnOrder };
  };
  const player1 = firstPlayerInit();
  const player2 = secondPlayerInit(player1);
  return console.log(player1), console.log(player2);
};

const gameFlow = (() => {
  playerSelect();
})();
