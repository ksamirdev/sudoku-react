import { SudokuCell } from "../types";
import { isNumberKey } from "../utils/utils";

interface CellProps {
  value: SudokuCell;
  isLocked: boolean;
  onChange: (value: SudokuCell) => void;
}

export function Cell({ value, isLocked, onChange }: CellProps) {
  if (isLocked) {
    return (
      <div className="size-10 flex items-center justify-center text-xl font-medium text-neutral-300 bg-white/5 select-none">
        {value}
      </div>
    );
  }

  return (
    <input
      type="text"
      className="size-10 bg-transparent text-xl focus:ring rounded-sm outline-none border-none text-center selection:bg-zinc-600"
      value={value || ""}
      onKeyDown={(ev) => {
        if (ev.key === "Backspace" || ev.key === "Delete") {
          onChange(null);
        } else if (isNumberKey(ev.key)) {
          onChange(+ev.key);
        }
      }}
      onChange={(ev) => {
        const v = ev.target.value.slice(-1);
        onChange(isNumberKey(v) ? +v : null);
      }}
      maxLength={1}
    />
  );
}
