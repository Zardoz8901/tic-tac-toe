"use strict";
const modalDialog = () => {
    const startGame = document.getElementById("click-to-play");
    const startDialog = document.getElementById("start-dialog");
    const confirmButton = (document.getElementById("confirm-button"));
    const playerOneName = document.querySelector("#player1");
    const playerTwoName = document.querySelector("#player2");
    startGame.addEventListener("click", () => {
        startDialog.showModal();
    });
    confirmButton.addEventListener("click", () => {
        startDialog.close();
    });
};
const initGameboard = () => {
    // Magic Square
    const gameBoard = [8, 1, 6, 3, 5, 7, 4, 9, 2];
    const playerOnePositions = [];
    const playerTwoPositions = [];
    return { gameBoard, playerOnePositions, playerTwoPositions };
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
const winCondition = (playerOne, playerTwo) => {
    // Permutation city, comment each line of the process break down how it works
    let win = false;
    const perm = (array, length) => {
        return array.flatMap((v, i) => length > 1
            ? perm(array.slice(i + 1), length - 1).map((w) => [v, ...w])
            : [[v]]);
    };
    if (win === false) {
        const playerOnePerm = perm(playerOne, 3);
        const playerTwoPerm = perm(playerTwo, 3);
        playerOnePerm.forEach((element) => {
            const elemReduce = element.reduce((sum, current) => sum + current, 0);
            if (elemReduce === 15) {
                win = true;
            }
            else {
                win = false;
            }
        });
        playerTwoPerm.forEach((element) => {
            const elemReduce = element.reduce((sum, current) => sum + current, 0);
            if (elemReduce === 15) {
                win = true;
            }
            else {
                win = false;
            }
        });
    }
    return win;
};
const displayCondition = (playerOne, playerTwo, symbol, win) => {
    if (symbol === "X" && win === true) {
        console.log("Player One Wins!");
    }
    else if (symbol === "O" && win === true) {
        console.log("Player Two Wins!");
    }
    else if (playerOne.length + playerTwo.length === 9 && win === false)
        console.log("Draw!");
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
    console.log(playerOnePositions);
    console.log(playerTwoPositions);
    const winC = winCondition(playerOnePositions, playerTwoPositions);
    displayCondition(playerOnePositions, playerTwoPositions, symbol, winC);
    gameState.splice(position, 1, symbol);
    const openPositions = gameState.filter((s) => s != "X" && s != "O");
    // console.log(playerOnePositions);
    // console.log(playerTwoPositions);
    return { gameBoard, openPositions, playerOnePositions };
};
const gridSelector = (newGame) => {
    const gridList = document.querySelectorAll("#game-grid> div");
    const gridArray = [...gridList];
    const moveTracker = [];
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
    modalDialog();
    const newGame = initGameboard();
    const gridSelect = gridSelector(newGame);
})();
