const board = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");
const status = document.querySelector(".status");
const resetButton = document.querySelector(".reset");

let currentTurn = "X";
let boardState = ["","","","","","","","",""];

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function checkWin(){
    for(let i = 0; i<winningCombos.length; i++){
        const [a, b, c] = winningCombos[i];
        if(boardState[a] !== "" && boardState[a]===boardState[b] && boardState[b] === boardState[c]) {
            return boardState[a];
        }
    }
    if (boardState.indexOf("") === -1) {
        return "tie"
    }

    return null;
}

function updateBoardState(cellIndex){
    boardState[cellIndex] = currentTurn;
}

function updateBoardView(cellIndex){
    cells[cellIndex].textContent = currentTurn;
}

function updateStatus(){
    status.textContent = `Player ${currentTurn}'s turn`;
}

function handleCellClick(event){
    const cell = event.target;
    const cellIndex = parseInt(cell.getAttribute("data-index"));
    if(boardState[cellIndex] !== "" || checkWin()){
        return;
    } 
    updateBoardState(cellIndex);
    updateBoardView(cellIndex);

    const winner = checkWin();
    if(winner){
        status.textContent = winner === "tie" ? "It's a tie" : `Player ${winner} wins!`;
    } else{
        currentTurn = currentTurn === "X" ? "O" : "X";
        updateStatus();
    }
}

function resetGame(){
    currentTurn = "X";
    boardState = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    updateStatus();
    status.textContent = `Player ${currentTurn}'s turn`;
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);