let currentPlayer = 'X';
let gameActive = true;
let board = [];

const gameBoard = document.getElementById('game-board');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset-btn');

const winCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function createBoard() {
    gameBoard.innerHTML = '';
    board = [];
    document.body.classList.remove('win', 'draw');

    for (let i = 0; i < 9; i++) {
        board.push('');

        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);

        cell.addEventListener('click', handleCellClick);

        gameBoard.appendChild(cell);
    }
}

function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');

    if (board[index] !== '' || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add('taken');

    if (currentPlayer === 'X') {
        event.target.classList.add('x');
    } else {
        event.target.classList.add('o');
    }

    checkResult();

    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = 'Ход игрока: ' + currentPlayer;
    }
}

function checkResult() {
    for (let combo of winCombinations) {
        const [a, b, c] = combo;

        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            statusText.textContent = 'Победил игрок: ' + currentPlayer;
            gameActive = false;
            document.body.classList.add('win');

            const cells = document.querySelectorAll('.cell');
            cells[a].classList.add('win');
            cells[b].classList.add('win');
            cells[c].classList.add('win');

            return;
        }
    }

    if (!board.includes('')) {
        statusText.textContent = 'Ничья';
        gameActive = false;
        document.body.classList.add('draw');
    }
}

resetButton.addEventListener('click', function () {
    currentPlayer = 'X';
    gameActive = true;
    statusText.textContent = 'Ход игрока: X';
    createBoard();
});

createBoard();
