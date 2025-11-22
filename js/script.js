const section1 = document.querySelector(".section1");
const section2 = document.querySelector(".section2");
section2.classList.add("hide")
const gameContainer = document.getElementById('gameContainer');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('startButton');
const nameInput = document.getElementById('nameInput');
const gameOverDisplay = document.getElementById('gameOver');

let notyf = new Notyf();
let pacman = { x: 10, y: 10 };
let ghost = { x: 200, y: 200 };
let score = 0;
let direction = 'RIGHT';
let gameInterval;
let isGameOver = false;

function startGame() {
    if (!nameInput.value) {
        alert("Please enter your name!");
        return;
    }
    section2.classList.remove("hide")
    section1.classList.add("hide")
    pacman = { x: 10, y: 10 };
    score = 0;
    direction = 'RIGHT';
    isGameOver = false;
    scoreDisplay.textContent = `Score: ${score}`;
    gameOverDisplay.style.display = 'none';
    generateGhost();
    gameInterval = setInterval(gameLoop, 100);
}

function gameLoop() {
    if (isGameOver) return;
    movePacman();
    checkCollision();
    checkGhost();
    render();
}

function movePacman() {
    if (direction === 'UP') pacman.y -= 10;
    if (direction === 'DOWN') pacman.y += 10;
    if (direction === 'LEFT') pacman.x -= 10;
    if (direction === 'RIGHT') pacman.x += 10;
}

function checkCollision() {
    if (pacman.x < 0 || pacman.x >= 500 || pacman.y < 0 || pacman.y >= 500) {
        gameOver();
    }
}

function checkGhost() {
    if (pacman.x === ghost.x && pacman.y === ghost.y) {
        score ++;
        scoreDisplay.textContent = `Score: ${score}`;
        generateGhost();
    }
}

function generateGhost() {
    ghost.x = Math.floor(Math.random() * 40) * 10;
    ghost.y = Math.floor(Math.random() * 40) * 10;
}

function render() {
    gameContainer.innerHTML = '';


    const pacmanCharacter = document.createElement('div');
    pacmanCharacter.classList.add('pacman');
    pacmanCharacter.style.left = `${pacman.x}px`;
    pacmanCharacter.style.top = `${pacman.y}px`;


    if (direction === 'UP') {
        pacmanCharacter.style.transform = 'rotate(270deg)';
    } else if (direction === 'DOWN') {
        pacmanCharacter.style.transform = 'rotate(90deg)';
    } else if (direction === 'LEFT') {
        pacmanCharacter.style.transform = 'rotate(180deg)';
    } else if (direction === 'RIGHT') {
        pacmanCharacter.style.transform = 'rotate(0deg)';
    }

    gameContainer.appendChild(pacmanCharacter);


    const ghostCharacter = document.createElement('div');
    ghostCharacter.classList.add('ghost');
    ghostCharacter.style.left = `${ghost.x}px`;
    ghostCharacter.style.top = `${ghost.y}px`;
    gameContainer.appendChild(ghostCharacter);
}

function gameOver() {
    clearInterval(gameInterval);
    isGameOver = true;
    gameOverDisplay.style.display = 'block';
    notyf.error(`Game Over, ${nameInput.value}! Final Score: ${score}`);

}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (e.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    if (e.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (e.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
});

startButton.addEventListener('click', startGame);