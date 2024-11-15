let button = document.querySelectorAll('.btn');
let newBtn = document.getElementById('new-game');
let showMsg = document.querySelector('.game-msg');
let turnX = true;
let winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const disabledBox = () => {
    for (let mybtn of button) {
        mybtn.disabled = true;
    }
};

const newGame = () => {
    let gameOverDiv = document.querySelector('.game-over');
    if (gameOverDiv) {
        gameOverDiv.remove();
    }
    turnX = true;
    showMsg.innerText = "";
    enableBox();
    let clicks = new Audio('click.wav');
    clicks.play();
};

const gameMsage = (msg) => {
    showMsg.innerText = msg;
};

button.forEach((box) => {
    box.addEventListener('click', () => {
        box.innerText = turnX ? "x" : "o";
        box.style.color = turnX ? 'aqua' : 'yellow';
        turnX = !turnX;
        box.disabled = true;
        winGame();
        let clicks = new Audio('click.wav');
        clicks.play();
    });
});

const winGame = () => {
    for (let pattern of winPattern) {
        let [a, b, c] = pattern;
        if (button[a].innerText && button[a].innerText === button[b].innerText && button[a].innerText === button[c].innerText) {
            disabledBox();
            gameMsage(`Winner ${button[a].innerText}`);
            gameOver(button[a].innerText);
            return;
        }
    }

    const isDraw = Array.from(button).every((box) => box.innerText !== "");
    if (isDraw) {
        gameMsage("It's a Draw!");
        gameOver();
    }
};

const gameOver = (winner = null) => {
    let div = document.createElement("div");
    div.classList.add('game-over');

    let h2 = document.createElement("h2");
    h2.textContent = "Game Over";
    
    let h3 = document.createElement("h3");
    h3.textContent = winner ? `Winner: ${winner}` : "It's a draw!";
    
    let gameOverButton = document.createElement("button");
    gameOverButton.innerHTML = "&#8634;";
    gameOverButton.classList.add('game-restart');
    gameOverButton.addEventListener('click', () => newGame());
    
    div.appendChild(h2);
    div.appendChild(h3);
    div.appendChild(gameOverButton);
    document.body.appendChild(div);
    let win = new Audio('win.mp3');
    win.play();
};

const enableBox = () => {
    for (let mybtn of button) {
        mybtn.disabled = false;
        mybtn.innerText = '';
    }
};

newBtn.addEventListener('click', () => {
    newGame();
});
