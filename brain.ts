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

// const playerSelect = () => {
//   const firstPlayerEmpty = (result) => {
//     if (result === "") {
//       result = prompt("Come again, I couldn't hear you over the din?");
//     }
//     return result;
//   };

//   const firstPlayerInit = async () => {
//     const result = prompt("What hail thee far-stranger?");
//     const name = await firstPlayerEmpty(result);
//     if (result === "") {
//       firstPlayerInit();
//     }
//     alert(result);
//     const promptSymbol = await prompt(
//       ` Ah ${result}, a name of potential! Now choose. Nought or Cross, traveler?`
//     );
//     const symbol = await sanitizeString(promptSymbol);
//     const turnOrder = 1;
//     return { name, symbol, turnOrder };
//   };
//   const secondPlayerInit = async (firstPlayerInit: any) => {
//     const name = prompt(
//       `And what is thine name, friend of ${firstPlayerInit.name} ?`
//     );
//     const symbolChoice = () => {
//       if (firstPlayerInit.symbol === "Nought") {
//         return "Cross";
//       } else if (firstPlayerInit.symbol === "Cross") {
//         return "Nought";
//       }
//     };
//     alert(
//       `${name}, a name best suited to the ${symbolChoice()}. Now we begin our bloody game!`
//     );
//     const symbol = symbolChoice();
//     const turnOrder = 2;
//     return { name, symbol, turnOrder };
//   };
//   const player1 = firstPlayerInit();
//   const player2 = secondPlayerInit(player1);
//   return console.log(player1), console.log(player2);
// };

const playerSelect = () => {
  const playerEmpty = (name) => {
    if (name === "") {
      name = prompt("Come again, I couldn't hear you over the din?");
    }
    return name;
  };

  const firstPlayerInit = async () => {
    const promptInit = prompt("What hail thee far-stranger?");
    const name = await playerEmpty(promptInit);
    if (name === "") {
      const name = firstPlayerInit();
      return name;
    }
    const promptSymbol = await prompt(
      ` Ah ${name}, a name of potential! Now choose. Nought or Cross, traveler?`
    );
    const symbol = await sanitizeString(promptSymbol);
    const turnOrder = 1;
    return await { name, symbol, turnOrder };
  };
  const secondPlayerInit = (firstPlayerInit) => {
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
  const player2 = player1.then(secondPlayerInit);
  Promise.all([player1, player2]).then((values) => {
    console.log(values);
  });
  console.log(player1, player2);
};

const gameFlow = (() => {
  playerSelect();
})();
