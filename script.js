const player1 = createPlayer("player1", "x");
const player2 = createPlayer("player2", "o");

const ticTacToe = (function () {
    function beginGame() {
        
    }
    function checkWinner(board) {
        if (true) {
            return "WIN!"
        }
    }
    return {checkWinner};
})();

const gameBoard = (function () {
    let board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
    function displayBoard() {
        console.log("Current Board: ");
        console.log(board[0]);
        console.log(board[1]);
        console.log(board[2]);
    }
    function makeMove(column, row, player) {
        board[column][row] = player.getMark();
    }
    return { displayBoard, makeMove };
})()

function createPlayer (name, mark) {
    let score = 0;

    const getMark = () => mark;
    const getScore = () => score;
    const increaseScore = () => score++;

    return { name, getMark, getScore, increaseScore };
}

gameBoard.makeMove(1, 2, player1)
gameBoard.displayBoard();
player2.increaseScore();
console.log(player2.name)