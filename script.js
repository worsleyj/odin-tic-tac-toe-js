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
    boardSpaces.forEach((space) => space.addEventListener("click", () => {
        playerChoice = space.textContent-1;
        TicTacToe.takeTurn();
        console.log("Clicked space " + space.textContent);
    }))
    
    const getCurrPlayerName = () => currPlayer.name;
    const resetTurns = () => turnNumber = 1;
    const nextTurn = () => turnNumber++;
    const takeTurn = () => {

        if (turnNumber % 2 != 0) {
            currPlayer = playerOne;
        } else {
            currPlayer = playerTwo;
        }
        currMarker.textContent = marker;
        marker = currPlayer.marker;


        if (Gameboard.getBoardSpace(playerChoice) != "X" && Gameboard.getBoardSpace(playerChoice) != "O") {
            Gameboard.setBoardSpace(playerChoice, marker);
            // Gameboard.board[playerChoice] = marker;
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
            resetTurns();
        } else if (turnNumber == 10) {
            console.log("Board is filled up! It's a draw!");
            Gameboard.clearBoard();
            resetTurns();
        }
    }
    return {getCurrPlayerName, takeTurn}
})();