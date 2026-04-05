import "./App.css";

import { cn } from "./utils/utils";
import { useSudokuGame } from "./hooks/useSudokuGame";
import { Cell } from "./components/Cell";

function App() {
   const { board, isLocked, isValid, isBoardComplete, dispatch } =
      useSudokuGame();

   return (
      <div className="flex flex-col gap-10 items-center justify-center">
         {/* MAIN - SUDOKU BOX */}
         <div className="border border-neutral-200 overflow-hidden">
            {board.map((row, i) => (
               <div
                  key={i}
                  className={cn(
                     "flex flex-row border-t border-neutral-500",
                     (i === 3 || i === 6) && "border-t-2 border-t-neutral-200",
                  )}
               >
                  {row.map((cell, j) => (
                     <div
                        key={j}
                        className={cn(
                           "size-10 relative overflow-hidden grid place-content-center place-items-center border-l border-neutral-500",
                           (j === 3 || j === 6) &&
                              "border-l-2 border-l-neutral-200",
                        )}
                     >
                        <Cell
                           value={cell}
                           isLocked={isLocked(i, j)}
                           onChange={(value) =>
                              dispatch({
                                 type: "set_cell",
                                 row: i,
                                 col: j,
                                 value,
                              })
                           }
                        />
                     </div>
                  ))}
               </div>
            ))}
         </div>

         {isBoardComplete && (
            <div className={isValid ? "text-green-500" : "text-red-500"}>
               Sudoku is {isValid ? "valid" : "invalid"}
            </div>
         )}

         <div className="flex gap-3">
            <button onClick={() => dispatch({ type: "generate" })}>
               Generate
            </button>
            <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
         </div>
      </div>
   );
}

export default App;
