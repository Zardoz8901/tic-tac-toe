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
//   const playerEmpty = (name) => {
//     if (name === "") {
//       name = prompt("Come again, I couldn't hear you over the din?");
//     }
//     return name;
//   };
//   const firstPlayerInit = new Promise(() => {
//     const promptInit = prompt("What hail thee far-stranger?");
//     const name = playerEmpty(promptInit);
//     if (name === "") {
//       const name = firstPlayerInit();
//       return name;
//     }
//     const promptSymbol = prompt(
//       ` Ah ${name}, a name of potential! Now choose. Nought or Cross, traveler?`
//     );
//     const symbol = sanitizeString(promptSymbol);
//     const turnOrder = 1;
//     return { name, symbol, turnOrder };
//   });
//   const secondPlayerInit = (firstPlayerInit) => {
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
//   console.log(player1.name);
//   console.log(player2);
//   return player1 + player2;
// };

// const playerSelect = () => {
//   const playerEmpty = (name) => {
//     if (name === "") {
//       name = prompt("Come again, I couldn't hear you over the din?");
//     }
//     return name;
//   };
//   const firstPlayerInit = () => {
//     const promptInit = prompt("What hail thee far-stranger?");
//     const name = playerEmpty(promptInit);
//     if (name === "") {
//       const name = firstPlayerInit();
//       return name;
//     }
//     const promptSymbol = prompt(
//       ` Ah ${name}, a name of potential! Now choose. Nought or Cross, traveler?`
//     );
//     const symbol = sanitizeString(promptSymbol);
//     const turnOrder = 1;
//     return { name, symbol, turnOrder };
//   };
//   const secondPlayerInit = (firstPlayerInit) => {
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
//   const player2 = player1.then(secondPlayerInit);
//   console.log(player1 + player2);
//   return player1 + player2;
// };

// function promiseEmpty(result) {
//   if (result === "") {
//     result = prompt("why");
//   }
//   alert(result);
//   return result;
// }

// const asyncMe = async () => {
//   const promptMe = prompt("who are you?");
//   const result = await promiseEmpty(promptMe);
//   if (result === "") {
//     asyncMe();
//   }
//   return result;
// };

// asyncMe();

const playerSelect = () => {
  const firstPlayerEmpty = (name) => {
    if (name === "") {
      name = prompt("Come again, I couldn't hear you over the din?");
    }
    console.log(name);
    return name;
  };
  const firstPlayerInit = new Promise(function (resolve) {
    const name = resolve(prompt("What hail thee far-stranger?"));
    const promptSymbol = prompt(
      ` Ah ${name}, a name of potential! Now choose. Nought or Cross, traveler?`
    );
    const symbol = sanitizeString(promptSymbol);
    const turnOrder = 1;
    return { name, symbol, turnOrder };
  }).then(firstPlayerEmpty);
};

//   const playerEmpty = (name) => {
//     if (name === "") {
//       name = prompt("Come again, I couldn't hear you over the din?");
//     }
//     return name;
//   };
//   const firstPlayerInit = new Promise(() => {
//     const promptInit = prompt("What hail thee far-stranger?");
//     const name = playerEmpty(promptInit);
//     if (name === "") {
//       const name = firstPlayerInit();
//       return name;
//     }
//     const promptSymbol = prompt(
//       ` Ah ${name}, a name of potential! Now choose. Nought or Cross, traveler?`
//     );
//     const symbol = sanitizeString(promptSymbol);
//     const turnOrder = 1;
//     return { name, symbol, turnOrder };
//   });

const gameFlow = (() => {
  playerSelect();
})();
