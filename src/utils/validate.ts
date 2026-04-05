import { SudokuCell } from "../types";

export interface CellConflict {
  isDimmed: boolean;
  isConflict: boolean;
}

export function computeConflicts(board: SudokuCell[][]): CellConflict[][] {
  const result: CellConflict[][] = Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => ({ isDimmed: false, isConflict: false }))
  );

  // Rows
  for (let i = 0; i < 9; i++) {
    const seen = new Map<number, number[]>();
    for (let j = 0; j < 9; j++) {
      const val = board[i][j];
      if (val === null) continue;
      if (!seen.has(val)) seen.set(val, []);
      seen.get(val)!.push(j);
    }
    for (const cols of seen.values()) {
      if (cols.length > 1) {
        for (let j = 0; j < 9; j++) result[i][j].isDimmed = true;
        for (const col of cols) result[i][col].isConflict = true;
      }
    }
  }

  // Columns
  for (let j = 0; j < 9; j++) {
    const seen = new Map<number, number[]>();
    for (let i = 0; i < 9; i++) {
      const val = board[i][j];
      if (val === null) continue;
      if (!seen.has(val)) seen.set(val, []);
      seen.get(val)!.push(i);
    }
    for (const rows of seen.values()) {
      if (rows.length > 1) {
        for (let i = 0; i < 9; i++) result[i][j].isDimmed = true;
        for (const row of rows) result[row][j].isConflict = true;
      }
    }
  }

  // Boxes
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const seen = new Map<number, [number, number][]>();
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const r = boxRow * 3 + i;
          const c = boxCol * 3 + j;
          const val = board[r][c];
          if (val === null) continue;
          if (!seen.has(val)) seen.set(val, []);
          seen.get(val)!.push([r, c]);
        }
      }
      for (const cells of seen.values()) {
        if (cells.length > 1) {
          for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
              result[boxRow * 3 + i][boxCol * 3 + j].isDimmed = true;
          for (const [r, c] of cells) result[r][c].isConflict = true;
        }
      }
    }
  }

  return result;
}

// https://leetcode.com/problems/valid-sudoku/solutions/476369/javascript-solution-beats-100-with-explanation-real-explanations
export function isValidSudoku(board: SudokuCell[][]) {
  const rows = new Array(9).fill(null).map(() => new Set());
  const cols = new Array(9).fill(null).map(() => new Set());
  const boxes = new Array(9).fill(null).map(() => new Set());

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const num = board[i][j];
      if (!num) continue;

      const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);

      if (rows[i].has(num) || cols[j].has(num) || boxes[boxIndex].has(num)) {
        return false;
      }

      rows[i].add(num);
      cols[j].add(num);
      boxes[boxIndex].add(num);
    }
  }

  return true;
}
