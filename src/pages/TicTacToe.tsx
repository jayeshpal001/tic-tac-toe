import { useState } from "react";
import { Board } from "../components/TicTacToe";
import {
  calculateWinnerWithLine,
  isDraw,
} from "../utils/ticTacToe";

type Player = "X" | "O";
type BoardType = (Player | null)[];

const TicTacToe = () => {
  const [board, setBoard] = useState<BoardType>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | undefined>();
  const [draw, setDraw] = useState(false);

  // player names
  const [players, setPlayers] = useState<Record<Player, string>>({
    X: "Player 1",
    O: "Player 2",
  });

  // scoreboard
  const [score, setScore] = useState({
    X: 0,
    O: 0,
    draw: 0,
  });

  const handleSquareClick = (index: number) => {
    if (board[index] || winner || draw) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const result = calculateWinnerWithLine(newBoard);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);

      setScore(prev => ({
        ...prev,
        [result.winner]: prev[result.winner] + 1,
      }));

      return;
    }

    if (isDraw(newBoard)) {
      setDraw(true);

      setScore(prev => ({
        ...prev,
        draw: prev.draw + 1,
      }));

      return;
    }

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setWinningLine(undefined);
    setDraw(false);
  };

  const statusText = winner
    ? `Winner: ${players[winner]} (${winner})`
    : draw
    ? "Match Draw 🤝"
    : `Next Player: ${players[currentPlayer]} (${currentPlayer})`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-sm w-full">
        <h1 className="text-2xl font-semibold mb-3">
          Tic Tac Toe
        </h1>

        {/* PLAYER NAME INPUTS */}
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            value={players.X}
            onChange={(e) =>
              setPlayers({ ...players, X: e.target.value })
            }
            className="border px-3 py-2 rounded-md w-full"
            placeholder="Player 1 Name"
          />

          <input
            type="text"
            value={players.O}
            onChange={(e) =>
              setPlayers({ ...players, O: e.target.value })
            }
            className="border px-3 py-2 rounded-md w-full"
            placeholder="Player 2 Name"
          />
        </div>

        <p className="text-gray-700 font-medium mb-2">
          {statusText}
        </p>

        {/* SCOREBOARD */}
        <div className="flex justify-between bg-gray-100 rounded-md p-3 mb-4 text-sm">
          <div className="text-center">
            <p className="font-medium">{players.X} (X)</p>
            <p className="text-lg font-bold">{score.X}</p>
          </div>

          <div className="text-center">
            <p className="font-medium">Draws</p>
            <p className="text-lg font-bold">{score.draw}</p>
          </div>

          <div className="text-center">
            <p className="font-medium">{players.O} (O)</p>
            <p className="text-lg font-bold">{score.O}</p>
          </div>
        </div>

        <Board
          board={board}
          onSquareClick={handleSquareClick}
          winningLine={winningLine}
        />

        <button
          onClick={restartGame}
          className="mt-5 px-4 py-2 rounded-md
            bg-purple-600 text-white
            hover:bg-purple-700 transition"
        >
          Restart Game
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
