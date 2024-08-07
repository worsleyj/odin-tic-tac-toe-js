const Gameboard = (function() {
    let board = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    let winner = "";
    const clearBoard = () => {
        board = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
        winner = "";
    }
    const getBoardSpace = (playerChoice) => {
        return board[playerChoice];
    }
    const setBoardSpace = (playerChoice, marker) => {
        board[playerChoice] = marker;
    }
    const displayBoard = () => {
        console.log("Current Board: ");
        console.log(board[0], board[1], board[2]);
        console.log(board[3], board[4], board[5]);
        console.log(board[6], board[7], board[8]);
    }
    const checkRows = () => {
        if ((board[0] == board[1] && board[1] == board[2]) ||
            (board[3] == board[4] && board[4] == board[5]) ||
            (board[6] == board[7] && board[7] == board[8])) {
                return true;
            } else return false;
    }
    const checkCols = () => {
        if ((board[0] == board[3] && board[3] == board[6]) ||
            (board[1] == board[4] && board[4] == board[7]) ||
            (board[2] == board[5] && board[5] == board[8])) {
                return true;
            } else return false;
    }
    const checkDiags = () => {
        if ((board[0] == board[4] && board[4] == board[8]) ||
            (board[6] == board[4] && board[4] == board[2])) {
                return true;
            } else return false;
    }
    const checkWinner = () => {
        if (checkRows() || checkCols() || checkDiags()) {
            winner = TicTacToe.getCurrPlayerName();
        }
        return winner;
    }
    return {clearBoard, getBoardSpace, setBoardSpace, displayBoard, checkWinner};
})();

function createPlayer(name, marker) {
    let score = 0;
    const addScore = () => score++;
    const printScore = () => name + "'s score is: " + score;
    return {name, marker, printScore, addScore}
}

const playerOne = createPlayer("Player One", "X");
const playerTwo = createPlayer("Player Two", "O");

const TicTacToe = (function() {
    let turnNumber = 1;
    let marker = " ";
    let currPlayer = "";
    let playerChoice = "";
    let currMarker = document.querySelector(".current-marker");
    let boardSpaces = document.querySelectorAll(".space");
    boardSpaces.forEach((space, index) => space.addEventListener("click", () => {
        playerChoice = index;
        takeTurn(index);
        console.log("Clicked space " + index);
    }))
    
    const getCurrPlayerName = () => currPlayer.name;
    const resetGame = () => {
        turnNumber = 1;
        boardSpaces.forEach((space) => space.textContent = "");
    }
    const nextTurn = () => turnNumber++;
    const takeTurn = (index) => {
        if (turnNumber % 2 != 0) {
            currPlayer = playerOne;
        } else {
            currPlayer = playerTwo;
        }
        currMarker.textContent = marker;
        marker = currPlayer.marker;
        boardSpaces[index].textContent = marker;

        if (Gameboard.getBoardSpace(playerChoice) != "X" && Gameboard.getBoardSpace(playerChoice) != "O") {
            Gameboard.setBoardSpace(playerChoice, marker);
            nextTurn();
        } else {
            console.log("Taken");
        }

        Gameboard.displayBoard();

        if (Gameboard.checkWinner() != "") {
            currPlayer.addScore();
            alert(Gameboard.checkWinner() + " is the winner!");
            console.log(currPlayer.printScore());
            Gameboard.clearBoard();
            resetGame();
        } else if (turnNumber == 10) {
            alert("Board is filled up! It's a draw!");
            Gameboard.clearBoard();
            resetGame();
        }
    }
    return {getCurrPlayerName}
})();