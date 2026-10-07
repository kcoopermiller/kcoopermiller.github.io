import { onCleanup, onMount } from 'solid-js';

const gridSize = 60;
const cellSize = 6;
const aliveColor = '#737373';
const deadColor = '#171717';

const GameOfLife = () => {
  let canvasRef;

  onMount(() => {
    const size = gridSize * cellSize;
    const scale = window.devicePixelRatio || 1;
    canvasRef.width = size * scale;
    canvasRef.height = size * scale;

    const ctx = canvasRef.getContext('2d');
    ctx.scale(scale, scale);

    let grid = initializeGrid();
    let next = new Uint8Array(gridSize * gridSize);
    drawGrid(ctx, grid);

    const interval = setInterval(() => {
      updateGrid(grid, next);
      [grid, next] = [next, grid];
      drawGrid(ctx, grid);
    }, 80);

    onCleanup(() => clearInterval(interval));
  });

  function initializeGrid() {
    const grid = new Uint8Array(gridSize * gridSize);
    for (let i = 0; i < grid.length; i++) {
      grid[i] = Math.floor(Math.random() * 1.25); // 0 or 1 with a slight bias towards 0
    }
    return grid;
  }

  function updateGrid(grid, next) {
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const cell = grid[y * gridSize + x];
        const aliveNeighbors = countNeighbors(grid, x, y);

        if (cell === 1 && (aliveNeighbors < 2 || aliveNeighbors > 3)) next[y * gridSize + x] = 0;
        else if (cell === 0 && aliveNeighbors === 3) next[y * gridSize + x] = 1;
        else next[y * gridSize + x] = cell;
      }
    }
  }

  function countNeighbors(grid, x, y) {
    let count = 0;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const xi = x + i;
        const yj = y + j;

        if (xi >= 0 && xi < gridSize && yj >= 0 && yj < gridSize) {
          count += grid[yj * gridSize + xi];
        }
      }
    }

    return count;
  }

  function drawGrid(ctx, grid) {
    ctx.fillStyle = deadColor;
    ctx.fillRect(0, 0, gridSize * cellSize, gridSize * cellSize);

    ctx.fillStyle = aliveColor;
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        if (grid[y * gridSize + x] === 1) {
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
      }
    }
  }

  return (
    <canvas
      ref={canvasRef}
      style={{ width: `${gridSize * cellSize}px`, height: `${gridSize * cellSize}px` }}
    ></canvas>
  );
};

export default GameOfLife;
