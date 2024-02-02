const player1 = createPlayer("player1", "x");
const player2 = createPlayer("player2", "o");

const ticTacToe = (function () {
    let turns = 0;
    let winner = 0;
    let currPlayer = "none";

    function beginGame() {
        while(turns < 9) {
            nextPlayer();
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
            currPlayer = player2;
        } else {
            currPlayer = player1;
        }
    }
    function checkWinner() {
        // check rows then columns for winners
        for (let x = 0; x < 3; x++) {
            if (gameBoard.board[x][0] == gameBoard.board[x][1] && gameBoard.board[x][1] == gameBoard.board[x][2]) {
                winner = currPlayer.name;
            } else if (gameBoard.board[0][x] == gameBoard.board[1][x] && gameBoard.board[1][x] == gameBoard.board[2][x]) {
                winner = currPlayer.name;
            }
        }
        // check diagonals
        if (gameBoard.board[0][0] == gameBoard.board[1][1] && gameBoard.board[1][1] == gameBoard.board[2][2]) {
            winner = currPlayer.name;
        } else if (gameBoard.board[0][2] == gameBoard.board[1][1] && gameBoard.board[1][1] == gameBoard.board[2][0]) {
            winner = currPlayer.name;
        }
        // if game has run out of empty spaces, declare a tie
        if (turns == 9) {
            console.log("No winners! Refresh the page to try again.")
        }
        // if winner, end the game
        if (winner != 0) {
            turns = 999;
        }
    }
    return { beginGame, checkWinner};
})();

const gameBoard = (function () {
    let board = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]
    function displayBoard() {
        console.log("Current Board: ");
        console.log(board[0]);
        console.log(board[1]);
        console.log(board[2]);
    }
    function makeMove(player) {
        column = prompt(player.name + " Enter column number: ")
        row = prompt(player.name + " Enter row number: ")
        // check if space is already taken and if inputs are valid
        if (validInput(column, row) && validSpace(column, row)) {
            board[row][column] = player.getMark();
        } else {
            makeMove(player);
        }
    }
    function validInput(column, row) {
        if (column > -1 && column < 3 && row > -1 && row < 3) {
            return true;
        } else {
            alert("Inputs are not valid! Enter numbers between 0-2");
            return false;
        }
    }
    function validSpace(column, row) {
        if ((board[column][row] != "x" && board[column][row] != "o")) {
            return true;
        } else {
            alert("Space already taken! Try another space.");
            return false;
        }
    }
    return { board, displayBoard, makeMove };
})()

// const but1 = document.querySelector("#button-one");
// but1.textContent = "12"

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

    function updateDisplay() {
        oneOne.textContent = gameBoard.board[0][0]
        oneTwo.textContent = gameBoard.board[1][0]
        oneThree.textContent = gameBoard.board[2][0]
        twoOne.textContent = gameBoard.board[0][1]
        twoTwo.textContent = gameBoard.board[1][1]
        twoThree.textContent = gameBoard.board[2][1]
        threeOne.textContent = gameBoard.board[0][2]
        threeTwo.textContent = gameBoard.board[1][2]
        threeThree.textContent = gameBoard.board[2][2]
    }

    return { updateDisplay }
})();

function createPlayer (name, mark) {
    let score = 0;

    const getMark = () => mark;
    const getScore = () => score;
    const increaseScore = () => score++;

    return { name, getMark, getScore, increaseScore };
}

viewController.updateDisplay();
// ticTacToe.beginGame();