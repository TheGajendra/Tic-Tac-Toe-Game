let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newgamebtn = document.querySelector("#New-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // O plays first

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Load sounds
const clickSound = new Audio("click.mp3");
const winSound = new Audio("win.mp3");
const tieSound = new Audio("tie.wav");

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    winSound.currentTime = 0;
    winSound.play();
    disableBoxes();
};

const checkWinner = () => {
    let isWinner = false;

    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                isWinner = true;
                showWinner(pos1Val);
                return;
            }
        }
    }

    // Check for tie
    let allFilled = true;
    boxes.forEach((box) => {
        if (box.innerText === "") {
            allFilled = false;
        }
    });

    if (!isWinner && allFilled) {
        msg.innerText = `It's a Tie! 😐`;
        msgContainer.classList.remove("hide");
        tieSound.currentTime = 0;
        tieSound.play();
        disableBoxes();
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            if (turnO) {
                box.innerText = "O";
                turnO = false;
            } else {
                box.innerText = "X";
                turnO = true;
            }
            box.disabled = true;

            clickSound.currentTime = 0;
            clickSound.play();

            checkWinner();
        }
    });
});

newgamebtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
