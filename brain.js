"use strict";
const gameBoard = {
    gameBoard: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ],
};
const sanitizeString = (stringIn) => {
    const string = stringIn.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
};
const playerSelect = () => {
    const player1 = () => {
        let name = prompt("What hail thee far-stranger?");
        name
            ? ""
            : (name = prompt("Come again, I couldn't hear you over the din?"));
        const promptSymbol = prompt(` Ah ${name}, a name of potential! Now choose. Nought or Cross, traveler?`);
        console.log(name);
        const symbol = sanitizeString(promptSymbol);
        const turnOrder = 1;
        return { name, symbol, turnOrder };
    };
    const player2 = (player1) => {
        const name = prompt(`And what is thine name, friend of ${player1.name} ?`);
        const symbolChoice = () => {
            if (player1.symbol === "Nought") {
                return "Cross";
            }
            else if (player1.symbol === "Cross") {
                return "Nought";
            }
        };
        alert(`${name}, a name best suited to the ${symbolChoice()}. Now we begin our bloody game!`);
        const symbol = symbolChoice();
        const turnOrder = 2;
        return { name, symbol, turnOrder };
    };
    const firstPlayer = player1();
    const secondPlayer = player2(firstPlayer);
    return console.log(firstPlayer), console.log(secondPlayer);
};
const gameFlow = (() => {
    playerSelect();
})();
