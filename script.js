const playerX = 'X';
const playerO = 'O';
let currentPlayer = playerX;
let board = ['', '', '', '', '', '', '', '', ''];

function startGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = playerX;
    document.getElementById('message').textContent = '';
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cell);
    }
}

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (board[index] === '') {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            document.getElementById('message').textContent = `Player ${currentPlayer} wins! Happy Birthday, Birthday Boy!`;
            endGame();
        } else if (board.every(cell => cell !== '')) {
            document.getElementById('message').textContent = 'It\'s a tie! Better luck next time, Birthday Boy!';
            endGame();
        } else {
            currentPlayer = currentPlayer === playerX ? playerO : playerX;
        }
    }
}

function checkWin(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => 
        pattern.every(index => board[index] === player)
    );
}

function endGame() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
}

document.addEventListener('DOMContentLoaded', startGame);
