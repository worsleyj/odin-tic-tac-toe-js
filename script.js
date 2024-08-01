const Gameboard = (function() {
    let board = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    return {board};
})();

function createPlayer(name, marker) {
    let score = 0;
    const addScore = () => score++;
    const printScore = () => name + "'s score is: " + score;
    return {name, marker, printScore, addScore}
}

const playerOne = createPlayer("Player One", "X");
const playerTwo = createPlayer("Player Two", "O");

playerOne.addScore();
console.log(playerOne.printScore());