
function createGame() {
    let gameState = [null,null,null,null,null,null,null,null,null];
    let currentPlayer = false; // False (0) is player 1, True (1) is player 2;

    const update = (square) => {
        gameState[square] = currentPlayer;
        currentPlayer = !currentPlayer;
        checkWinner();
    }

    const reset = () => {
        gameState = [null,null,null,null,null,null,null,null,null];
    }

    const checkHorizontal = () => {
        if (gameState[0] === gameState[1] && gameState[1] === gameState[2]) {
            return gameState[0];
        }
        if (gameState[3] === gameState[4] && gameState[4] === gameState[5]) {
            return gameState[3];
        }
        if (gameState[6] === gameState[7] && gameState[7] === gameState[8]) {
            return gameState[6];
        }
        return null;
    }

    const checkVertical = () => {
        if (gameState[0] === gameState[3] && gameState[3] === gameState[6]) {
            return gameState[0];
        }
        if (gameState[1] === gameState[4] && gameState[4] === gameState[7]) {
            return gameState[1];
        }
        if (gameState[2] === gameState[5] && gameState[5] === gameState[8]) {
            return gameState[2];
        }
        return null;
    }

    const checkDiagonal = () => {
        if (gameState[0] === gameState[4] && gameState[4] === gameState[8]) {
            return gameState[0];
        }
        if (gameState[2] === gameState[4] && gameState[4] === gameState[6]) {
            return gameState[2];
        }
        return null;
    }

    const checkWinner = () => {
        let win = [checkHorizontal(), checkVertical(), checkDiagonal()];
        let result = null;
        win.forEach((winner) => {
            if(winner !== null){
                result = winner;
            }
        })
        return result;
    }

    const getCurrentPlayer = () => {
        return currentPlayer;
    }

    return {update, reset, getCurrentPlayer, checkWinner}
}

function displayWinner(winner) {
    if(winner){
        winnerText.textContent = "X has won!";
    } else {
        winnerText.textContent = "O has won!";
    }
    gameBoard.style.pointerEvents = "none";
}


const Game = createGame();
const gameSquares = document.querySelectorAll(".gamesquare");
const resetButton = document.querySelector("#resetBoard");
const winnerText = document.querySelector("#winner");
const gameBoard = document.querySelector(".gameboard");

let n = 0;
gameSquares.forEach(square => {
    const squareNumber = n;
    square.addEventListener("click", (e) => {
        if (Game.getCurrentPlayer()) {
            square.textContent = "X"
        } else {
            square.textContent = "O"
        }
        Game.update(squareNumber);
        let outcome = Game.checkWinner();
        if(outcome !== null){
            displayWinner(outcome);
        }
    })
    n++
})

resetButton.addEventListener("click", (e) => {
    Game.reset()
    gameSquares.forEach(square => {square.textContent = "";})
    gameBoard.style.pointerEvents = "auto";
    winnerText.textContent = "";
})
