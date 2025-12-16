import { useState } from "react";

type Player = "X" | "O";
type Board = (Player | null)[];

const TicTacToe = () => {
  // 9 empty cells
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Tic Tac Toe
        </h1>

        <p className="text-center text-gray-600">
          Next Player: {currentPlayer}
        </p>

        {/* Board UI next step me aayega */}
      </div>
    </div>
  );
};

export default TicTacToe;
