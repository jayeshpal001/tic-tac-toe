type Player = "X" | "O";

interface SquareProps {
  value: Player | null;
  onClick: () => void;
}

const Square = ({ value, onClick }: SquareProps) => {
  return (
    <button
      onClick={onClick}
      className="w-20 h-20 border border-gray-300
        flex items-center justify-center
        text-3xl font-bold
        hover:bg-gray-100
        transition"
    >
      {value}
    </button>
  );
};

export default Square;
