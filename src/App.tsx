import "./App.css";

import { useCallback, useMemo, useState } from "react";
import { cn, isNumberKey } from "./utils/utils";
import { generateSudokuPuzzle, isValidSudoku } from "./utils/sudoku";
import { SudokuCell } from "./types";

const MATRIX_SIZE = 9;

const emptyBoard = (): SudokuCell[][] =>
  Array.from({ length: MATRIX_SIZE }, () => Array(MATRIX_SIZE).fill(null));

function App() {
  const [board, setBoard] = useState<SudokuCell[][]>(emptyBoard());
  const [clues, setClues] = useState<SudokuCell[][]>(emptyBoard());

  const hasAnyValue = useMemo(
    () => board.some((row) => row.some((cell) => cell !== null)),
    [board]
  );

  const isValidSudokuMemo = useMemo(() => isValidSudoku(board), [board]);

  const handleUpdateCellValue = useCallback(
    (i: number, j: number, value: SudokuCell) => {
      setBoard((prev) => {
        const updated = prev.map((row, rowIndex) =>
          row.map((cell, colIndex) =>
            rowIndex === i && colIndex === j ? value : cell
          )
        );
        return updated;
      });
    },
    []
  );

  const handlePuzzleGenerate = () => {
    const puzzle = generateSudokuPuzzle(53);
    setBoard(puzzle.map((row) => [...row]));
    setClues(puzzle.map((row) => [...row]));
  };

  const handleReset = () => {
    setBoard(clues.map((row) => [...row]));
  };

  return (
    <div className="flex flex-col gap-10 items-center justify-center">
      {/* MAIN - SUDOKU BOX */}
      <div className="border border-neutral-200 overflow-hidden">
        {/* MATRIX: m x n */}
        {new Array(MATRIX_SIZE).fill(0).map((_, i) => {
          return (
            <div
              key={String(i)}
              className={cn(
                "flex flex-row border-t border-neutral-500",
                (i === 3 || i === 6) && "border-t-2 border-t-neutral-200"
              )}
            >
              {new Array(MATRIX_SIZE).fill(0).map((_, j) => {
                const isLocked = clues[i][j] !== null;
                return (
                  <div
                    key={String(j)}
                    className={cn(
                      "size-10 relative overflow-hidden grid place-content-center place-items-center border-l border-neutral-500",
                      (j === 3 || j === 6) && "border-l-2 border-l-neutral-200"
                    )}
                  >
                    {isLocked ? (
                      <div className="size-10 flex items-center justify-center text-xl font-medium text-neutral-300 bg-white/5 select-none">
                        {board[i][j]}
                      </div>
                    ) : (
                      <input
                        type="text"
                        className="size-10 bg-transparent text-xl focus:ring rounded-sm outline-none border-none text-center selection:bg-zinc-600"
                        value={board[i][j] || ""}
                        onKeyDown={(ev) => {
                          const value = ev.key;
                          const v = isNumberKey(value) ? +value : null;
                          if (ev.key === "Backspace" || ev.key === "Delete") {
                            handleUpdateCellValue(i, j, null);
                          } else if (v !== null) {
                            handleUpdateCellValue(i, j, v);
                          }
                        }}
                        onChange={(ev) => {
                          const value = ev.target.value.slice(-1);
                          const v = isNumberKey(value) ? +value : null;
                          handleUpdateCellValue(i, j, v);
                        }}
                        maxLength={1}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {hasAnyValue && (
        <div className={isValidSudokuMemo ? "text-green-500" : "text-red-500"}>
          Sudoku is {isValidSudokuMemo ? "valid" : "invalid"}
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={handlePuzzleGenerate}>Generate</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default App;
