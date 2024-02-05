const player1 = createPlayer("player1", "x");
const player2 = createPlayer("player2", "o");

const ticTacToe = (function () {
    const messages = document.querySelector("#messages")
    let turns = 0;
    let winner = 0;
    let currPlayer = player1;

    function getCurrentPlayer() {
        return currPlayer;
    }
    function beginGame() {
        while(turns < 9) {
            gameBoard.makeMove(currPlayer);
            checkWinner();
            // console.log(winner);
            // console.log(turns)
            gameBoard.displayBoard();
            turns++;
        }
    }
    function nextPlayer() {
        if (currPlayer == player1) {
            // console.log("Current player: " + currPlayer.name)
            currPlayer = player2;
        } else {
            // console.log("Current player: " + currPlayer.name)
            currPlayer = player1;
        }
    }
    function checkWinner() {
        // check rows then columns for winners
        for (let x = 0; x < 3; x++) {
            if (gameBoard.board[x][0] == gameBoard.board[x][1] && gameBoard.board[x][1] == gameBoard.board[x][2] && gameBoard.board[x][0] != "_") {
                winner = currPlayer.name;
            } else if (gameBoard.board[0][x] == gameBoard.board[1][x] && gameBoard.board[1][x] == gameBoard.board[2][x] && gameBoard.board[0][x] != "_") {
                winner = currPlayer.name;
            }
        }
        // check diagonals
        if (gameBoard.board[0][0] == gameBoard.board[1][1] && gameBoard.board[1][1] == gameBoard.board[2][2] && gameBoard.board[0][0] != "_") {
            winner = currPlayer.name;
        } else if (gameBoard.board[0][2] == gameBoard.board[1][1] && gameBoard.board[1][1] == gameBoard.board[2][0] && gameBoard.board[2][0] != "_") {
            winner = currPlayer.name;
        }
        // if game has run out of empty spaces, declare a tie
        if (turns == 9) {
            console.log("No winners! Refresh the page to try again.")
        }
        // if winner, end the game
        if (winner != 0) {
            winner = 0;
            turns = 999;
            messages.textContent = "You won!";
            console.log(winner);
            // gameBoard.resetBoard();
            // viewController.resetDisplay();
        }
    }
    return { messages, getCurrentPlayer, nextPlayer, currPlayer, beginGame, checkWinner};
})();

const gameBoard = (function () {
    let board = [
        ["_", "_", "_"],
        ["_", "_", "_"],
        ["_", "_", "_"]
    ]
    function displayBoard() {
        console.log("Current Board: ");
        console.log(board[0]);
        console.log(board[1]);
        console.log(board[2]);
    }
    function resetBoard() {
        // console.log("board reset")
        ticTacToe.messages.textContent = "";
        board = [
            ["_", "_", "_"],
            ["_", "_", "_"],
            ["_", "_", "_"]
        ]
    }
    function makeMove(column, row, player) {
        // column = prompt(player.name + " Enter column number: ")
        // row = prompt(player.name + " Enter row number: ")
        // check if space is already taken and if inputs are valid
        if (validSpace(column, row)) {
            board[row][column] = player.getMark();
            ticTacToe.nextPlayer();
            ticTacToe.checkWinner();
            displayBoard();
            // console.log(ticTacToe.getCurrentPlayer())
        } else {
            // makeMove(player);
        }
    }
    function validSpace(column, row) {
        if ((board[column][row] != "x" && board[column][row] != "o")) {
            return true;
        } else {
            // alert("Space already taken! Try another space.");
            return true;
        }
    }
    return { board, displayBoard, resetBoard, makeMove };
})()

const viewController = (function () {
    const oneOne = document.querySelector("#one-one");
    const oneTwo = document.querySelector("#one-two");
    const oneThree = document.querySelector("#one-three");
    const twoOne = document.querySelector("#two-one");
    const twoTwo = document.querySelector("#two-two");
    const twoThree = document.querySelector("#two-three");
    const threeOne = document.querySelector("#three-one");
    const threeTwo = document.querySelector("#three-two");
    const threeThree = document.querySelector("#three-three");

    const resetBtn = document.querySelector("#reset-button");

    oneOne.addEventListener('click', () => {
        gameBoard.makeMove(0, 0, ticTacToe.getCurrentPlayer());
        oneOne.textContent = gameBoard.board[0][0];
    })
    oneTwo.addEventListener('click', () => {
        gameBoard.makeMove(0, 1, ticTacToe.getCurrentPlayer());
        oneTwo.textContent = gameBoard.board[1][0];
    })
    oneThree.addEventListener('click', () => {
        gameBoard.makeMove(0, 2, ticTacToe.getCurrentPlayer());
        oneThree.textContent = gameBoard.board[2][0];
    })
    twoOne.addEventListener('click', () => {
        gameBoard.makeMove(1, 0, ticTacToe.getCurrentPlayer());
        twoOne.textContent = gameBoard.board[0][1];
    })
    twoTwo.addEventListener('click', () => {
        gameBoard.makeMove(1, 1, ticTacToe.getCurrentPlayer());
        twoTwo.textContent = gameBoard.board[1][1];
    })
    twoThree.addEventListener('click', () => {
        gameBoard.makeMove(1, 2, ticTacToe.getCurrentPlayer());
        twoThree.textContent = gameBoard.board[2][1];
    })
    threeOne.addEventListener('click', () => {
        gameBoard.makeMove(2, 0, ticTacToe.getCurrentPlayer());
        threeOne.textContent = gameBoard.board[0][2];
    })
    threeTwo.addEventListener('click', () => {
        gameBoard.makeMove(2, 1, ticTacToe.getCurrentPlayer());
        threeTwo.textContent = gameBoard.board[1][2];
    })
    threeThree.addEventListener('click', () => {
        gameBoard.makeMove(2, 2, ticTacToe.getCurrentPlayer());
        threeThree.textContent = gameBoard.board[2][2];
    })
    resetBtn.addEventListener('click', () => {
        gameBoard.resetBoard();
        resetDisplay();
    })

    function resetDisplay() {
        oneOne.textContent = "_";
        oneTwo.textContent = "_";
        oneThree.textContent = "_";
        twoOne.textContent = "_";
        twoTwo.textContent = "_";
        twoThree.textContent = "_";
        threeOne.textContent = "_";
        threeTwo.textContent = "_";
        threeThree.textContent = "_";
    }
    return { resetDisplay }
})();

function createPlayer (name, mark) {
    let score = 0;

    const getMark = () => mark;
    const getScore = () => score;
    const increaseScore = () => score++;

    return { name, getMark, getScore, increaseScore };
}

// ticTacToe.beginGame();