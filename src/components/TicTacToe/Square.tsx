type Player = "X" | "O";

interface SquareProps {
  value: Player | null;
  onClick: () => void;
  disabled?: boolean;
  highlight?: boolean;
}

const Square = ({ value, onClick, disabled, highlight }: SquareProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-20 h-20 border border-gray-300
        flex items-center justify-center
        text-3xl font-bold transition
        ${highlight ? "bg-green-200" : ""}
        ${disabled ? "cursor-not-allowed" : "hover:bg-gray-100"}
      `}
    >
      {value}
    </button>
  );
};

export default Square;
