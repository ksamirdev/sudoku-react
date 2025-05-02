import { Cell } from "../App";

// https://leetcode.com/problems/valid-sudoku/solutions/476369/javascript-solution-beats-100-with-explanation-real-explanations
export function isValidSudoku(board: Cell[][]) {
  let rows = new Array(9).fill(null).map(() => new Set());
  let cols = new Array(9).fill(null).map(() => new Set());
  let boxes = new Array(9).fill(null).map(() => new Set());

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let num = board[i][j];
      if (!num) continue;

      let boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);

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
