import { useCallback, useMemo, useReducer } from "react";
import { generateSudokuPuzzle } from "../utils/generate";
import { isValidSudoku } from "../utils/validate";
import { SudokuBoard, SudokuCell } from "../types";

export type SudokuAction =
  | { type: "generate" }
  | { type: "reset" }
  | { type: "set_cell"; row: number; col: number; value: SudokuCell };

interface GameState {
  board: SudokuBoard;
  clues: SudokuBoard;
}

const emptyBoard = (): SudokuBoard =>
  Array.from({ length: 9 }, () => Array(9).fill(null));

function reducer(state: GameState, action: SudokuAction): GameState {
  switch (action.type) {
    case "generate": {
      const puzzle = generateSudokuPuzzle(53);
      return {
        board: puzzle.map((row) => [...row]),
        clues: puzzle.map((row) => [...row]),
      };
    }
    case "reset": {
      return { ...state, board: state.clues.map((row) => [...row]) };
    }
    case "set_cell": {
      const { row, col, value } = action;
      if (state.clues[row][col] !== null) return state;
      return {
        ...state,
        board: state.board.map((r, i) =>
          r.map((cell, j) => (i === row && j === col ? value : cell))
        ),
      };
    }
  }
}

export function useSudokuGame() {
  const [state, dispatch] = useReducer(reducer, {
    board: emptyBoard(),
    clues: emptyBoard(),
  });

  const isLocked = useCallback(
    (row: number, col: number) => state.clues[row][col] !== null,
    [state.clues]
  );

  const isBoardComplete = useMemo(
    () => state.board.every((row) => row.every((cell) => cell !== null)),
    [state.board]
  );

  const isValid = useMemo(() => isValidSudoku(state.board), [state.board]);

  return {
    board: state.board,
    isLocked,
    isValid,
    isBoardComplete,
    dispatch,
  };
}
