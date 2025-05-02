import { useState } from "react";
import "./App.css";
import { cn } from "./utils";

const MATRIX_SIZE = 9;

const INITIAL_VALUES: number[][] = [
  [0, 0, 0, /**/ 0, 0, 0, /**/ 0, 0, 0],
  [0, 0, 0, /**/ 0, 0, 0, /**/ 0, 0, 0],
  [0, 0, 0, /**/ 0, 0, 0, /**/ 0, 0, 0],

  [0, 0, 0, /**/ 0, 0, 0, /**/ 0, 0, 0],
  [0, 0, 0, /**/ 0, 0, 0, /**/ 0, 0, 0],
  [0, 0, 0, /**/ 0, 0, 0, /**/ 0, 0, 0],

  [0, 0, 0, /**/ 0, 0, 0, /**/ 0, 0, 0],
  [0, 0, 0, /**/ 0, 0, 0, /**/ 0, 0, 0],
  [0, 0, 0, /**/ 0, 0, 0, /**/ 0, 0, 0],
];

function App() {
  const [cells, setCells] = useState<number[][]>(INITIAL_VALUES);

  return (
    <div className="flex flex-col items-center justify-center">
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
                      className="size-10 bg-transparent text-xl focus:ring rounded-sm outline-none border-none text-center"
                      value={cells[i][j]}
                      onChange={(ev) => {
                        setCells((prev) => {
                          prev[i][j] = +ev.target.value;
                          return prev;
                        });
                      }}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
