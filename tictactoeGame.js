alert("Hello! Welcome to the game of Tic Tac Toe! Click the PLAY button to start the game.");

const player1 = 'x';
const player2 = 'circle';

let playingIs = true;
let game = false;
const winCombination = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winMsgElement = document.getElementById('winMsg');
const restartButton = document.getElementById('restartButton');
const winMsgTxtElement = document.querySelector('[win-msg-txt]');
const playerTxtElement = document.querySelector('[player-msg-txt]');

function startGame() {
    // Removing all the previous entries if any
    cellElements.forEach(cell => {
        cell.classList.remove(player1);
        cell.classList.remove(player2);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true});
    })
    setBoard();
    winMsgElement.classList.remove('show');
    $
}

function handleClick(e) {
    const cell = e.target; // Determining the cell targeted
    // Determining which player is current playing
    let currentPlayer = playingIs ? player1 : player2;
    placeMark(cell, currentPlayer);
    endGame(currentPlayer);
    swapTurns();
    setBoard();
}

function endGame(currentPlayer) {
    let winner = checkWin(currentPlayer);
    if (!winner && isDraw()) {
        winMsgTxtElement.innerText = 'DRAW!';
        winMsgElement.classList.add('show');
        restartButton.addEventListener('click', startGame);
    } else if (winner) {
        winMsgTxtElement.innerText = `${playingIs ? "X's" : "O's"} WINS!`;
        winMsgElement.classList.add('show');
        restartButton.addEventListener('click', startGame);
    }
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(player1) || cell.classList.contains(player2);
    })
}

function placeMark(cell, currentPlayer) {
    cell.classList.add(currentPlayer);
}

function swapTurns() {
    playingIs = !playingIs;
    playerTxtElement.innerText = `${playingIs ? " Player 1" : "Player 2"} Turns`;
}

function setBoard() {
    board.classList.remove(player1);
    board.classList.remove(player2);
    if (playingIs) {
        board.classList.add(player1);
    } else {
        board.classList.add(player2);
    }
}

function checkWin(currentPlayer) {
    return winCombination.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentPlayer);
        })
    })
}