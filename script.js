const player1 = createPlayer("player1", "x");
const player2 = createPlayer("player2", "o");

const ticTacToe = (function () {
    function beginGame() {

    }
    function checkWinner() {
        // check rows then columns for winners
        for (let x = 0; x < 3; x++) {
            if (gameBoard.board[x][0] == gameBoard.board[x][1] && gameBoard.board[x][1] == gameBoard.board[x][2]) {
                return x + " Winner! ";
            } else if (gameBoard.board[0][x] == gameBoard.board[1][x] && gameBoard.board[1][x] == gameBoard.board[2][x]) {
                return " Winner! " + x;
            }
        }
        // check diagonals
        if (gameBoard.board[0][0] == gameBoard.board[1][1] && gameBoard.board[1][1] == gameBoard.board[2][2]) {
            return " Winner! ";
        } else if (gameBoard.board[0][2] == gameBoard.board[1][1] && gameBoard.board[1][1] == gameBoard.board[2][0]) {
            return " Winner! ";
        }
        // if board is full and there are no winners, declare a tie

    }
    return {checkWinner};
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
        column = prompt("Enter column number: ")
        row = prompt("Enter row number: ")
        if (board[column][row] != player.getMark()) {
            board[column][row] = player.getMark();
        } else {
            alert("Space already taken! Try another space.");
            makeMove(player);
        }
    }
    return { board, displayBoard, makeMove };
})()

function createPlayer (name, mark) {
    let score = 0;

    const getMark = () => mark;
    const getScore = () => score;
    const increaseScore = () => score++;

    return { name, getMark, getScore, increaseScore };
}

gameBoard.makeMove(player1)
gameBoard.makeMove(player1)
console.log(ticTacToe.checkWinner());
gameBoard.displayBoard();
player2.increaseScore();
console.log(player2.name)