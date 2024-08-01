const Gameboard = (function() {
    let board = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    let winner = "";
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
            console.log(TicTacToe.getCurrPlayerName() + " is the winner!");
            winner = TicTacToe.getCurrPlayerName();
        }
        return winner;
    }
    return {board, displayBoard, checkWinner};
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
    
    const getCurrPlayerName = () => currPlayer.name;
    const nextTurn = () => turnNumber++;
    const takeTurn = () => {
        if (turnNumber % 2 != 0) {
            currPlayer = playerOne;
        } else {
            currPlayer = playerTwo;
        }
        marker = currPlayer.marker;
        let playerChoice = prompt("Enter an index to place your marker. Current marker: " + marker);
        Gameboard.board[playerChoice] = marker;
        Gameboard.displayBoard();
        Gameboard.checkWinner();
        nextTurn();

        while (Gameboard.checkWinner() == "" || turnNumber < 7) {
            TicTacToe.takeTurn();
        }
    }
    return {turnNumber, getCurrPlayerName, takeTurn}
})();

TicTacToe.takeTurn();