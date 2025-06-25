const gridContainer = document.getElementById("grid-container");
const scoreDisplay = document.getElementById("score");
const restartButton = document.getElementById("restart");

let grid = [];
let score = 0;

function initGame() {
  grid = Array(4).fill(null).map(() => Array(4).fill(0));
  score = 0;
  updateScore();
  addNewTile();
  addNewTile();
  renderGrid();
}

function updateScore() {
  scoreDisplay.textContent = score;
}

function renderGrid() {
  gridContainer.innerHTML = "";
  grid.forEach(row => {
    row.forEach(cell => {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      if (cell !== 0) {
        tile.textContent = cell;
        tile.classList.add("new");
      }
      gridContainer.appendChild(tile);
    });
  });
}

function addNewTile() {
  const emptyCells = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (grid[r][c] === 0) emptyCells.push([r, c]);
    }
  }
  if (emptyCells.length === 0) return;
  const [r, c] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  grid[r][c] = 2;
}

function handleMove(direction) {
  let rotated = rotateGrid(grid, direction);
  let [newGrid, moved, gained] = slideAndMerge(rotated);
  if (moved) {
    grid = rotateGrid(newGrid, (4 - direction) % 4);
    score += gained;
    updateScore();
    addNewTile();
    renderGrid();
    checkGameOver();
  }
}

function slideAndMerge(mat) {
  let moved = false;
  let scoreGain = 0;
  const newMat = mat.map(row => {
    let newRow = row.filter(v => v !== 0);
    for (let i = 0; i < newRow.length - 1; i++) {
      if (newRow[i] === newRow[i + 1]) {
        newRow[i] *= 2;
        scoreGain += newRow[i];
        newRow[i + 1] = 0;
        moved = true;
      }
    }
    newRow = newRow.filter(v => v !== 0);
    while (newRow.length < 4) newRow.push(0);
    if (!moved && newRow.some((v, i) => v !== row[i])) moved = true;
    return newRow;
  });
  return [newMat, moved, scoreGain];
}

function rotateGrid(mat, times) {
  let newMat = mat.map(row => [...row]);
  for (let t = 0; t < times; t++) {
    newMat = newMat[0].map((_, i) => newMat.map(row => row[i]).reverse());
  }
  return newMat;
}

function checkGameOver() {
  if (grid.flat().includes(0)) return;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      let val = grid[r][c];
      if ((r < 3 && grid[r + 1][c] === val) || (c < 3 && grid[r][c + 1] === val)) {
        return;
      }
    }
  }
  alert("Game Over! Score: " + score);
}

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp": handleMove(0); break;
    case "ArrowRight": handleMove(1); break;
    case "ArrowDown": handleMove(2); break;
    case "ArrowLeft": handleMove(3); break;
  }
});

restartButton.addEventListener("click", initGame);

initGame();
