const Gameboard = (function() {
    let board = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];

    const displayBoard = () => {
        console.log("Current Board: ");
        console.log(board[0], board[1], board[2]);
        console.log(board[3], board[4], board[5]);
        console.log(board[6], board[7], board[8]);
    }
    return {board, displayBoard};
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
    const nextTurn = () => turnNumber++;
    const takeTurn = () => {
        if (turnNumber % 2 != 0) {
            marker = playerOne.marker;
        } else {
            marker = playerTwo.marker;
        }
        let playerChoice = prompt("Enter an index to place your marker. Current marker: " + marker)
        Gameboard.board[playerChoice] = marker;
        Gameboard.displayBoard();
        nextTurn();
    }
    return {turnNumber, takeTurn}
})();

TicTacToe.takeTurn();
TicTacToe.takeTurn();
TicTacToe.takeTurn();