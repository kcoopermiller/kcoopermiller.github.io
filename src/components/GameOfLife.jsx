import { createSignal, onMount } from 'solid-js';
import * as d3 from 'd3';

const gridSize = 60;
const cellSize = 6;

const GameOfLife = () => {
  let svgRef;
  const [grid, setGrid] = createSignal(initializeGrid(gridSize, gridSize));

  onMount(() => {
    const svg = d3.select(svgRef);
    drawGrid(svg, grid());

    const interval = setInterval(() => {
      setGrid(grid => updateGrid(grid));
      drawGrid(svg, grid());
    }, 80);

    return () => clearInterval(interval);
  });

  function initializeGrid(rows, cols) {
    return Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => Math.floor(Math.random() * 1.25)) // 0 or 1 with a slight bias towards 0
    );
  }

  function updateGrid(grid) {
    const newGrid = grid.map((row, i) =>
      row.map((cell, j) => {
        const neighbors = getNeighbors(grid, i, j);
        const aliveNeighbors = neighbors.filter(n => n === 1).length;

        if (cell === 1 && (aliveNeighbors < 2 || aliveNeighbors > 3)) return 0;
        if (cell === 0 && aliveNeighbors === 3) return 1;
        return cell;
      })
    );

    return newGrid;
  }

  function getNeighbors(grid, x, y) {
    const neighbors = [];

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const xi = x + i;
        const yj = y + j;

        if (xi >= 0 && xi < gridSize && yj >= 0 && yj < gridSize) {
          neighbors.push(grid[xi][yj]);
        }
      }
    }

    return neighbors;
  }

  function drawGrid(svg, grid) {
    const cells = svg
      .selectAll('rect')
      .data(flattenGrid(grid), (d, i) => i)
      .join(
        enter => enter.append('rect')
          .attr('x', d => d.x * cellSize)
          .attr('y', d => d.y * cellSize)
          .attr('width', cellSize)
          .attr('height', cellSize)
          .attr('fill', d => d.alive ? '#737373' : '#171717'),
        update => update
          .attr('fill', d => d.alive ? '#737373' : '#171717')
      );
  }

  function flattenGrid(grid) {
    const flatArray = [];
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        flatArray.push({ x, y, alive: grid[y][x] === 1 });
      }
    }
    return flatArray;
  }

  return (
    <svg ref={svgRef} width={gridSize * cellSize} height={gridSize * cellSize}></svg>
  );
};

export default GameOfLife;
