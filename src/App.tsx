import "./App.css";

import { useCallback, useMemo, useState } from "react";
import { cn, isNumberKey } from "./utils/utils";
import { isValidSudoku } from "./utils/sudoku";

const MATRIX_SIZE = 9;

const INITIAL_VALUES: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],

  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],

  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

export type Cell = number | null;

function App() {
  const [board, setBoard] = useState<Cell[][]>(INITIAL_VALUES);

  const isValidSudokuMemo = useMemo(() => isValidSudoku(board), [board]);

  const handleUpdateCellValue = useCallback(
    (i: number, j: number, value: Cell) => {
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

  return (
    <div className="flex flex-col gap-10 items-center justify-center">
      {/* MAIN - SUDOKU BOX */}
      <div className="border-r border-b border-l-[1px] border-t-[1px] border-neutral-200 overflow-hidden">
        {/* MATRIX: m x n */}
        {new Array(MATRIX_SIZE).fill(0).map((_, i) => {
          return (
            <div
              key={String(i)}
              className={cn(
                "flex flex-row border-t border-neutral-500",
                i === 3 && "border-neutral-200",
                i === 6 && "border-neutral-200"
              )}
            >
              {new Array(MATRIX_SIZE).fill(0).map((_, j) => {
                return (
                  <div
                    key={String(j)}
                    className={cn(
                      "size-10 relative overflow-hidden grid place-content-center place-items-center border-l border-neutral-500",
                      j === 3 && "border-neutral-200",
                      j === 6 && "border-neutral-200"
                    )}
                  >
                    <input
                      type="text"
                      className="size-10 bg-transparent text-xl focus:ring rounded-sm outline-none border-none text-center selection:bg-zinc-600"
                      value={board[i][j] || ""}
                      onKeyDown={(ev) => {
                        const value = ev.key;

                        const v = isNumberKey(value) ? +value : null;
                        handleUpdateCellValue(i, j, v);
                      }}
                      onChange={(ev) => {
                        const value = ev.target.value;

                        const v = isNumberKey(value) ? +value : null;
                        handleUpdateCellValue(i, j, v);
                      }}
                      maxLength={1}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className={isValidSudokuMemo ? "text-green-500" : "text-red-500"}>
        Sudoku is {isValidSudokuMemo ? "valid" : "invalid"}
      </div>
    </div>
  );
}

export default App;
