"use strict";
const modalDialog = () => {
    const startGame = document.getElementById("click-to-play");
    const startDialog = (document.getElementById("start-dialog"));
    const confirmButton = (document.getElementById("confirm-button"));
    const playerOneName = document.querySelector("#player1");
    const playerTwoName = document.querySelector("#player2");
    const playerOneNameDiv = document.querySelector("#name-1 > .player-name");
    const playerTwoNameDiv = document.querySelector("#name-2 > .player-name");
    const playerOneWarn = (document.querySelector("#input-required-1"));
    const playerTwoWarn = (document.querySelector("#input-required-2"));
    startGame.addEventListener("click", () => {
        startDialog.showModal();
    });
    startDialog.addEventListener("keydown", (e) => {
        if (e.key === "Enter" &&
            playerOneName.value !== "" &&
            playerTwoName.value !== "") {
            confirmButton.click();
            startDialog.classList.add("fade");
            e.preventDefault();
            startDialog.close();
        }
    });
    playerOneName.addEventListener("keydown", (e) => {
        playerOneWarn.classList.add("fade");
        playerOneName.classList.remove("required-border");
    });
    playerTwoName.addEventListener("keydown", (e) => {
        playerTwoWarn.classList.add("fade");
        playerTwoName.classList.remove("required-border");
    });
    playerOneName.addEventListener("webkitAnimationEnd", (e) => {
        playerOneName.classList.remove("required-animation");
        playerOneName.classList.add("required-border");
    });
    playerTwoName.addEventListener("webkitAnimationEnd", (e) => {
        playerTwoName.classList.remove("required-animation");
        playerTwoName.classList.add("required-border");
    });
    confirmButton.addEventListener("click", (e) => {
        if (playerOneName.value === "" && playerTwoName.value === "") {
            playerOneName.classList.add("required-animation");
            playerTwoName.classList.add("required-animation");
            playerOneWarn.classList.remove("fade");
            playerTwoWarn.classList.remove("fade");
            playerOneWarn.classList.add("reveal");
            playerTwoWarn.classList.add("reveal");
            e.preventDefault();
            return;
        }
        if (playerOneName.value === "") {
            playerOneWarn.classList.remove("fade");
            playerOneWarn.classList.add("reveal");
            playerOneName.classList.add("required-animation");
            e.preventDefault();
            return;
        }
        if (playerTwoName.value === "") {
            playerTwoWarn.classList.add("reveal");
            playerTwoWarn.classList.remove("fade");
            playerTwoName.classList.add("required-animation");
            e.preventDefault();
            return;
        }
        playerOneNameDiv.innerText = playerOneName.value;
        playerOneNameDiv.classList.add("reveal");
        playerTwoNameDiv.innerText = playerTwoName.value;
        playerTwoNameDiv.classList.add("reveal");
        startGame.classList.add("fade");
        startGame.classList.add("noclick");
        startDialog.close();
    });
    // requires async await
    // return { playerOneNameDiv, playerTwoNameDiv };
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
    const playerOnePerm = perm(playerOne, 3);
    const playerTwoPerm = perm(playerTwo, 3);
    playerOnePerm.forEach((element) => {
        const elemReduce = element.reduce((sum, current) => sum + current, 0);
        console.log(elemReduce, "1");
        if (elemReduce === 15) {
            win = true;
        }
        else if (win === false) {
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
    });
    return win;
};
const resetDisplay = (playerOneWinStatus, playerTwoWinStatus, div) => {
    const resetButton = document.getElementById("click-to-reset");
    resetButton === null || resetButton === void 0 ? void 0 : resetButton.addEventListener("click", () => {
        playerOneWinStatus.classList.remove("reveal");
        playerTwoWinStatus.classList.remove("reveal");
        playerOneWinStatus.classList.add("fade");
        playerTwoWinStatus.classList.add("fade");
        playerOneWinStatus.innerText = "";
        playerTwoWinStatus.innerText = "";
        div.classList.remove("noclick");
    });
};
const resetMoves = (gameBoard) => {
    const resetButton = document.getElementById("click-to-reset");
    resetButton === null || resetButton === void 0 ? void 0 : resetButton.addEventListener("click", () => {
        gameBoard.gameBoard = [8, 1, 6, 3, 5, 7, 4, 9, 2];
        gameBoard.playerOnePositions = [];
        gameBoard.playerTwoPositions = [];
    });
};
const resetBoard = (div) => {
    const resetButton = document.getElementById("click-to-reset");
    resetButton === null || resetButton === void 0 ? void 0 : resetButton.addEventListener("click", () => {
        div.textContent = "";
    });
};
const resetMoveTracker = (moveTracker) => {
    const resetButton = document.getElementById("click-to-reset");
    resetButton === null || resetButton === void 0 ? void 0 : resetButton.addEventListener("click", () => {
        moveTracker = [];
    });
};
const displayCondition = (playerOneProclamation, playerTwoProclamation, playerOneArray, playerTwoArray, symbol, win) => {
    const gridList = document.querySelectorAll("#game-grid> div");
    const gridArray = [...gridList];
    const resetButton = document.getElementById("click-to-reset");
    if (symbol === "X" && win === true) {
        playerOneProclamation.innerText = "Winner";
        playerTwoProclamation.innerText = "Loser";
    }
    else if (symbol === "O" && win === true) {
        playerOneProclamation.innerText = "Loser";
        playerTwoProclamation.innerText = "Winner";
    }
    else if (playerOneArray.length + playerTwoArray.length === 9 &&
        win === false) {
        playerOneProclamation.innerText = "Draw";
        playerTwoProclamation.innerText = "Draw";
    }
    gridArray.forEach((div) => {
        if (playerOneProclamation.innerText === "Winner" ||
            playerOneProclamation.innerText === "Loser" ||
            playerOneProclamation.innerText === "Draw") {
            playerOneProclamation.classList.remove("fade");
            playerTwoProclamation.classList.remove("fade");
            playerOneProclamation.classList.add("reveal");
            playerTwoProclamation.classList.add("reveal");
            div.classList.add("noclick");
            resetButton === null || resetButton === void 0 ? void 0 : resetButton.classList.add("reveal");
            resetDisplay(playerOneProclamation, playerTwoProclamation, div);
        }
    });
};
const insertMove = (gameBoard, symbol, position) => {
    const playerOneProclamation = document.querySelector("#name-1 > .proclamation");
    const playerTwoProclamation = document.querySelector("#name-2 > .proclamation");
    const gameState = gameBoard.gameBoard;
    const playerOnePositions = gameBoard.playerOnePositions;
    const playerTwoPositions = gameBoard.playerTwoPositions;
    if (symbol === "X") {
        playerOnePositions.push(gameState[position]);
    }
    else {
        playerTwoPositions.push(gameState[position]);
    }
    const winC = winCondition(playerOnePositions, playerTwoPositions);
    displayCondition(playerOneProclamation, playerTwoProclamation, playerOnePositions, playerTwoPositions, symbol, winC);
    gameState.splice(position, 1, symbol);
    const openPositions = gameState.filter((s) => s != "X" && s != "O");
    console.log(playerOnePositions);
    console.log(playerTwoPositions);
    return { gameBoard, openPositions, playerOnePositions };
};
const gridSelector = (gameBoard) => {
    const gridList = document.querySelectorAll("#game-grid> div");
    const gridArray = [...gridList];
    let moveTracker = [];
    const playerOneNameDiv = document.querySelector("#name-1 > .player-name");
    const playerTwoNameDiv = document.querySelector("#name-2 > .player-name");
    const resetButton = document.getElementById("click-to-reset");
    resetButton === null || resetButton === void 0 ? void 0 : resetButton.addEventListener("click", () => {
        moveTracker = [];
    });
    resetMoves(gameBoard);
    gridArray.forEach((div) => {
        div.addEventListener("click", () => {
            if (playerOneNameDiv.innerText !== "" &&
                playerTwoNameDiv.innerText !== "") {
                const gridOrigin = div.dataset.gridOrigin;
                moveTracker.push(gridOrigin);
                console.log("move", moveTracker);
                // implement player turn rotation
                let symbol = "X";
                if (moveTracker.length % 2 === 0) {
                    symbol = "O";
                }
                //  inject player symbol
                div.classList.add("noclick");
                div.textContent = symbol;
                // reset board
                resetBoard(div);
                return insertMove(gameBoard, symbol, gridOrigin);
            }
            else {
                return;
            }
        });
    });
};
const gameFlow = (() => {
    const newDialog = modalDialog();
    const newGame = initGameboard();
    const gridSelect = gridSelector(newGame);
})();
