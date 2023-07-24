"use strict";
const initGameboard = () => {
    const gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    return gameBoard;
};
const gridSelector = () => {
    const gridList = document.querySelectorAll("[data]");
    const gridArray = [...gridList];
    gridArray.forEach((span) => {
        span.addEventListener("click", (e) => {
            console.log(span);
        });
    });
    console.log(gridArray);
};
const insertMove = (gameBoard, symbol, position) => {
    gameBoard.splice(position, 1, symbol);
    console.log(gameBoard);
    return gameBoard;
};
const playerSelect = () => {
    const initPlayer = (playerNumber) => {
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
    gridSelector();
    const newGame = initGameboard();
    // insertMove(newGame, "X", 8);
    // insertMove(newGame, "O", 1);
    playerSelect();
})();
