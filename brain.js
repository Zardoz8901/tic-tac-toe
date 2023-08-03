"use strict";
const initGameboard = () => {
    const gameBoard = [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 1],
        [1, 2],
        [2, 0],
        [2, 1],
        [2, 2],
    ];
    const playerOnePositions = [];
    const playerTwoPositions = [];
    return { gameBoard, playerOnePositions, playerTwoPositions };
};
const initMoveTracker = () => {
    const moveTracker = [];
    return moveTracker;
};
const initPlayer = (playerNumber) => {
    const playOrder = playerNumber;
    const name = "Player" + playerNumber;
    const symbol = "X";
    if (playerNumber === 2) {
        const symbol = "O";
        return { name, symbol, playOrder };
    }
    return { name, symbol, playOrder };
};
const insertMove = (gameBoard, symbol, position) => {
    const playerOne = initPlayer(1);
    const playerTwo = initPlayer(2);
    const gameState = gameBoard.gameBoard;
    const playerOnePositions = gameBoard.playerOnePositions;
    const playerTwoPositions = gameBoard.playerTwoPositions;
    if (symbol === "X") {
        playerOnePositions.push(gameState[position]);
    }
    else {
        playerTwoPositions.push(gameState[position]);
    }
    gameState.splice(position, 1, symbol);
    const openPositions = gameState.filter((s) => s != "X" && s != "O");
    // for (const [key, value] of Object.entries(gameBoard)) {
    //   console.log(`${key}:${value}`);
    // }
    console.log(playerOnePositions);
    console.log(playerTwoPositions);
    console.log(gameState);
    console.log(openPositions);
    return { gameBoard, openPositions, playerOnePositions };
};
const gridSelector = (moveTracker, newGame) => {
    const gridList = document.querySelectorAll("#game-grid> div");
    const gridArray = [...gridList];
    gridArray.forEach((div) => {
        div.addEventListener("click", () => {
            const gridOrigin = div.dataset.gridOrigin;
            moveTracker.push(gridOrigin);
            // implement player turn rotation
            let symbol = "X";
            if (moveTracker.length % 2 === 0) {
                symbol = "O";
            }
            //  inject player symbol
            div.classList.add("noclick");
            div.textContent = symbol;
            return insertMove(newGame, symbol, gridOrigin);
        });
    });
};
const gameFlow = (() => {
    const newGame = initGameboard();
    const moveTracker = initMoveTracker();
    const gridSelect = gridSelector(moveTracker, newGame);
})();
