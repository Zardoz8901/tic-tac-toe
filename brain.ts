const modalDialog = () => {
  const startGame = <HTMLInputElement>document.getElementById("click-to-play");
  const startDialog = <HTMLDialogElement>(
    document.getElementById("start-dialog")
  );
  const confirmButton = <HTMLButtonElement>(
    document.getElementById("confirm-button")
  );
  const playerOneName = <HTMLInputElement>document.querySelector("#player1");
  const playerTwoName = <HTMLInputElement>document.querySelector("#player2");
  const playerOneNameDiv = document.querySelector(
    "#name-1 > .player-name"
  ) as HTMLDivElement;
  const playerTwoNameDiv = document.querySelector(
    "#name-2 > .player-name"
  ) as HTMLDivElement;
  const playerOneWarn = <HTMLElement>(
    document.querySelector("#input-required-1")
  );
  const playerTwoWarn = <HTMLElement>(
    document.querySelector("#input-required-2")
  );
  startGame.addEventListener("click", () => {
    startDialog.showModal();
  });
  startDialog.addEventListener("keydown", (e) => {
    if (
      e.key === "Enter" &&
      playerOneName.value !== "" &&
      playerTwoName.value !== ""
    ) {
      confirmButton.click();
      startDialog.classList.add("fade");
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

const initPlayer = (playerNumber: number) => {
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
    return array.flatMap((v, i) =>
      length > 1
        ? perm(array.slice(i + 1), length - 1).map((w) => [v, ...w])
        : [[v]]
    );
  };
  if (win === false) {
    const playerOnePerm = perm(playerOne, 3);
    const playerTwoPerm = perm(playerTwo, 3);
    playerOnePerm.forEach((element) => {
      const elemReduce = element.reduce((sum, current) => sum + current, 0);
      if (elemReduce === 15) {
        win = true;
      } else {
        win = false;
      }
    });
    playerTwoPerm.forEach((element) => {
      const elemReduce = element.reduce((sum, current) => sum + current, 0);
      if (elemReduce === 15) {
        win = true;
      } else {
        win = false;
      }
    });
  }
  return win;
};

const displayCondition = (
  playerOneProclamation,
  playerTwoProclamation,
  playerOneArray,
  playerTwoArray,
  symbol,
  win
) => {
  const gridList = document.querySelectorAll("#game-grid> div");
  const gridArray = [...gridList];

  if (symbol === "X" && win === true) {
    playerOneProclamation.innerText = "Winner";
    playerTwoProclamation.innerText = "Loser";
  } else if (symbol === "O" && win === true) {
    playerOneProclamation.innerText = "Loser";
    playerTwoProclamation.innerText = "Winner";
  } else if (
    playerOneArray.length + playerTwoArray.length === 9 &&
    win === false
  ) {
    playerOneProclamation.innerText = "Draw";
    playerTwoProclamation.innerText = "Draw";
  }
  gridArray.forEach((div) => {
    if (
      playerOneProclamation.innerText === "Winner" ||
      playerOneProclamation.innerText === "Loser" ||
      playerOneProclamation.innerText === "Draw"
    ) {
      playerOneProclamation.classList.add("reveal");
      playerTwoProclamation.classList.add("reveal");
      div.classList.add("noclick");
    }
  });
};

const insertMove = (gameBoard: number[], symbol: string, position: number) => {
  const playerOneProclamation = document.querySelector(
    "#name-1 > .proclamation"
  ) as HTMLDivElement;
  const playerTwoProclamation = document.querySelector(
    "#name-2 > .proclamation"
  ) as HTMLDivElement;
  const gameState = gameBoard.gameBoard;
  const playerOnePositions = gameBoard.playerOnePositions;
  const playerTwoPositions = gameBoard.playerTwoPositions;
  if (symbol === "X") {
    playerOnePositions.push(gameState[position]);
  } else {
    playerTwoPositions.push(gameState[position]);
  }
  const winC = winCondition(playerOnePositions, playerTwoPositions);
  displayCondition(
    playerOneProclamation,
    playerTwoProclamation,
    playerOnePositions,
    playerTwoPositions,
    symbol,
    winC
  );
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
  const playerOneNameDiv = document.querySelector(
    "#name-1 > .player-name"
  ) as HTMLDivElement;
  const playerTwoNameDiv = document.querySelector(
    "#name-2 > .player-name"
  ) as HTMLDivElement;
  gridArray.forEach((div) => {
    div.addEventListener("click", () => {
      if (
        playerOneNameDiv.innerText !== "" &&
        playerTwoNameDiv.innerText !== ""
      ) {
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
      } else {
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
