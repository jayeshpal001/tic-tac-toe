import Square from "./Square";

type Player = "X" | "O";
type BoardType = (Player | null)[];

interface BoardProps {
  board: BoardType;
  onSquareClick: (index: number) => void;
  winningLine?: number[];
}

const Board = ({ board, onSquareClick, winningLine }: BoardProps) => {
  return (
    <div className="grid grid-cols-3  mt-4">
      {board.map((value, index) => (
        <Square
          key={index}
          value={value}
          onClick={() => onSquareClick(index)}
          disabled={value !== null}
          highlight={winningLine?.includes(index)}
        />
      ))}
    </div>
  );
};

export default Board;
