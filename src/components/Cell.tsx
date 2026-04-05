import { SudokuCell } from "../types";
import { cn, isNumberKey } from "../utils/utils";

interface CellProps {
  value: SudokuCell;
  isLocked: boolean;
  isDimmed: boolean;
  isConflict: boolean;
  onChange: (value: SudokuCell) => void;
}

export function Cell({ value, isLocked, isDimmed, isConflict, onChange }: CellProps) {
  const bg = isConflict
    ? "bg-red-500/20"
    : isDimmed
      ? "bg-red-500/10"
      : null;

  if (isLocked) {
    return (
      <div
        className={cn(
          "size-10 flex items-center justify-center text-xl font-medium text-neutral-300 select-none",
          bg ?? "bg-white/5"
        )}
      >
        {value}
      </div>
    );
  }

  return (
    <input
      type="text"
      className={cn(
        "size-10 text-xl focus:ring rounded-sm outline-none border-none text-center selection:bg-zinc-600",
        bg ?? "bg-transparent"
      )}
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
