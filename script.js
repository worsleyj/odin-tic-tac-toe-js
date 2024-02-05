const player1 = createPlayer("Player 1", "x");
const player2 = createPlayer("Player 2", "o");

const ticTacToe = (function () {
    const messages = document.querySelector("#messages");
    const currentPlayer = document.querySelector("#current-player");
    
    let turns = 0;
    let winner = 0;
    let currPlayer = player1;
    displayCurrentPlayer();

    function displayCurrentPlayer() {
        currentPlayer.textContent = "Current Player: " + currPlayer.getName() + " - " + currPlayer.getMark(); 
    }
    function setCurrentPlayer(player) {
        currPlayer = player;
        displayCurrentPlayer();
    }
    function getCurrentPlayer() {
        return currPlayer;
    }
    function nextPlayer() {
        console.log(player1.getName() + "   " + player2.getName())
        turns++;
        if (currPlayer == player1) {
            currPlayer = player2;
        } else {
            currPlayer = player1;
        }
        displayCurrentPlayer();
    }
    function checkWinner() {
        // check rows then columns for winners
        for (let x = 0; x < 3; x++) {
            if (gameBoard.accessBoard(x, 0) == gameBoard.accessBoard(x, 1) && gameBoard.accessBoard(x, 1) == gameBoard.accessBoard(x, 2) && gameBoard.accessBoard(x, 0) != "_") {
                winner = currPlayer.name;
            } else if (gameBoard.accessBoard(0, x) == gameBoard.accessBoard(1, x) && gameBoard.accessBoard(1, x) == gameBoard.accessBoard(2, x) && gameBoard.accessBoard(0, x) != "_") {
                winner = currPlayer.name;
            }
        }
        // check diagonals
        if (gameBoard.accessBoard(0, 0) == gameBoard.accessBoard(1, 1) && gameBoard.accessBoard(1, 1) == gameBoard.accessBoard(2, 2) && gameBoard.accessBoard(0, 0) != "_") {
            winner = currPlayer.name;
        } else if (gameBoard.accessBoard(0, 2) == gameBoard.accessBoard(1, 1) && gameBoard.accessBoard(1, 1) == gameBoard.accessBoard(2, 0) && gameBoard.accessBoard(2, 0) != "_") {
            winner = currPlayer.name;
        }
        // if game has run out of empty spaces, declare a tie
        if (turns == 9) {
            messages.style.color = "black"
            messages.textContent = "The board is full! The game is a draw."
        }
        // if winner, end the game
        if (winner != 0) {
            nextPlayer();
            messages.style.color = "green";
            messages.textContent = currPlayer.getName() + " won!";
            winner = 0;
            turns = 0;
        }
    }
    return { messages, displayCurrentPlayer, setCurrentPlayer, getCurrentPlayer, nextPlayer, currPlayer, checkWinner};
})();

const gameBoard = (function () {
    let board = [
        ["_", "_", "_"],
        ["_", "_", "_"],
        ["_", "_", "_"]
    ]
    function accessBoard(column, row) {
        // console.log("returning " + board[column][row])
        return board[column][row];
    }
    function resetBoard() {
        ticTacToe.setCurrentPlayer(player1);
        board = [
            ["_", "_", "_"],
            ["_", "_", "_"],
            ["_", "_", "_"]
        ]
    }
    function displayBoard() {
        console.log("Current Board: ");
        console.log(board[0]);
        console.log(board[1]);
        console.log(board[2]);
    }
    function makeMove(column, row, player) {
        // column = prompt(player.name + " Enter column number: ")
        // row = prompt(player.name + " Enter row number: ")
        // check if space is already taken
        ticTacToe.messages.textContent = "";
        if (validSpace(column, row)) {
            board[row][column] = player.getMark();
            ticTacToe.nextPlayer();
            ticTacToe.checkWinner();
            displayBoard();
        }
    }
    function validSpace(column, row) {
        if (board[row][column] == "_") {
            return true;
        } else {
            ticTacToe.messages.style.color = "red";
            ticTacToe.messages.textContent = "Space already taken! Try another space.";
            return false;
        }
    }
    return { accessBoard, displayBoard, resetBoard, makeMove };
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

    const nameChange = document.querySelector(".change-names")
    const nameReset = document.querySelector(".reset-names")

    oneOne.addEventListener('click', () => {
        gameBoard.makeMove(0, 0, ticTacToe.getCurrentPlayer());
        oneOne.textContent = gameBoard.accessBoard(0, 0);
    })
    oneTwo.addEventListener('click', () => {
        gameBoard.makeMove(0, 1, ticTacToe.getCurrentPlayer());
        oneTwo.textContent = gameBoard.accessBoard(1, 0);
    })
    oneThree.addEventListener('click', () => {
        gameBoard.makeMove(0, 2, ticTacToe.getCurrentPlayer());
        oneThree.textContent = gameBoard.accessBoard(2, 0);
    })
    twoOne.addEventListener('click', () => {
        gameBoard.makeMove(1, 0, ticTacToe.getCurrentPlayer());
        twoOne.textContent = gameBoard.accessBoard(0, 1);
    })
    twoTwo.addEventListener('click', () => {
        gameBoard.makeMove(1, 1, ticTacToe.getCurrentPlayer());
        twoTwo.textContent = gameBoard.accessBoard(1, 1);
    })
    twoThree.addEventListener('click', () => {
        gameBoard.makeMove(1, 2, ticTacToe.getCurrentPlayer());
        twoThree.textContent = gameBoard.accessBoard(2, 1);
    })
    threeOne.addEventListener('click', () => {
        gameBoard.makeMove(2, 0, ticTacToe.getCurrentPlayer());
        threeOne.textContent = gameBoard.accessBoard(0, 2);
    })
    threeTwo.addEventListener('click', () => {
        gameBoard.makeMove(2, 1, ticTacToe.getCurrentPlayer());
        threeTwo.textContent = gameBoard.accessBoard(1, 2);
    })
    threeThree.addEventListener('click', () => {
        gameBoard.makeMove(2, 2, ticTacToe.getCurrentPlayer());
        threeThree.textContent = gameBoard.accessBoard(2, 2);
    })
    resetBtn.addEventListener('click', () => {
        ticTacToe.messages.style.color = "black";
        ticTacToe.messages.textContent = "";
        gameBoard.resetBoard();
        resetDisplay();
    })
    nameChange.addEventListener('click', () => {
        event.preventDefault();
        const nameOne = document.querySelector('#player1-name').value;
        const nameTwo = document.querySelector('#player2-name').value;
        if (nameOne != "") {
            player1.setName(nameOne);
        }
        if (nameTwo != "") {
            player2.setName(nameTwo);
        }
        ticTacToe.displayCurrentPlayer();
    })
    nameReset.addEventListener('click', () => {
        player1.setName("Player 1");
        player2.setName("Player 2");
        ticTacToe.displayCurrentPlayer();
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

    const setName = newName => name = newName;
    const getName = () => name;
    const getMark = () => mark;
    const getScore = () => score;
    const increaseScore = () => score++;

    return { name, getName, setName, getMark, getScore, increaseScore };
}