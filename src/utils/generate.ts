import { SudokuBoard } from "../types";

export function generateSudokuPuzzle(emptyCells: number = 40): SudokuBoard {
  const SIZE = 9;
  const board: number[][] = Array.from({ length: SIZE }, () =>
    Array(SIZE).fill(0)
  );

  function isSafe(row: number, col: number, num: number): boolean {
    for (let x = 0; x < SIZE; x++) {
      if (board[row][x] === num || board[x][col] === num) return false;
    }

    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) return false;
      }
    }

    return true;
  }

  function fillBoard(row: number = 0, col: number = 0): boolean {
    if (col === SIZE) {
      col = 0;
      row++;
      if (row === SIZE) return true;
    }

    const numbers = shuffle(Array.from({ length: SIZE }, (_, i) => i + 1));
    for (const num of numbers) {
      if (isSafe(row, col, num)) {
        board[row][col] = num;
        if (fillBoard(row, col + 1)) return true;
        board[row][col] = 0;
      }
    }

    return false;
  }

  function shuffle(array: number[]): number[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function makeBlanks(count: number): void {
    let removed = 0;
    while (removed < count) {
      const row = Math.floor(Math.random() * SIZE);
      const col = Math.floor(Math.random() * SIZE);
      if (board[row][col] !== 0) {
        board[row][col] = 0;
        removed++;
      }
    }
  }

  fillBoard();
  makeBlanks(emptyCells);

  return board.map((row) => row.map((val) => (val === 0 ? null : val)));
}
