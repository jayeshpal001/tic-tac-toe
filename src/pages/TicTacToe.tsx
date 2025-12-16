import { useState } from "react";
import {
    Board,
    ScoreBoard,
    ResultTable,
} from "../components/TicTacToe";
import {
    calculateWinnerWithLine,
    isDraw,
} from "../utils/ticTacToe";

type Player = "X" | "O";
type BoardType = (Player | null)[];

type ResultItem = {
    id: number;
    result: "WIN" | "DRAW";
    winnerName?: string;
    symbol?: Player;
};

const TicTacToe = () => {
    const [board, setBoard] = useState<BoardType>(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
    const [winner, setWinner] = useState<Player | null>(null);
    const [winningLine, setWinningLine] = useState<number[] | undefined>();
    const [draw, setDraw] = useState(false);

    const [players, setPlayers] = useState<Record<Player, string>>({
        X: "Player 1",
        O: "Player 2",
    });

    const [score, setScore] = useState({ X: 0, O: 0, draw: 0 });
    const [results, setResults] = useState<ResultItem[]>([]);

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

            setResults(prev => [
                ...prev,
                {
                    id: prev.length + 1,
                    result: "WIN",
                    winnerName: players[result.winner],
                    symbol: result.winner,
                },
            ]);
            return;
        }

        if (isDraw(newBoard)) {
            setDraw(true);
            setScore(prev => ({ ...prev, draw: prev.draw + 1 }));
            setResults(prev => [
                ...prev,
                { id: prev.length + 1, result: "DRAW" },
            ]);
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 px-4">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg max-w-md w-full space-y-4">

                {/* Title */}
                <h1 className="text-3xl font-bold text-center text-purple-700">
                    Tic Tac Toe
                </h1>

                {/* Status */}
                <p className="text-center font-medium text-gray-700">
                    {statusText}
                </p>

                {/* Score Board */}
                <div className="border rounded-lg p-3 bg-gray-50">
                    <ScoreBoard players={players} score={score} />
                </div>

                {/* Game Board */}
                <div className="flex justify-center">
                    <Board
                        board={board}
                        onSquareClick={handleSquareClick}
                        winningLine={winningLine}
                    />
                </div>

                {/* Restart Button */}
                <button
                    onClick={restartGame}
                    className="w-full py-2 bg-purple-600 hover:bg-purple-700 transition text-white font-semibold rounded-lg"
                >
                    Restart Game
                </button>

                {/* Result Table */}
                <div className="border-t pt-3">
                    <ResultTable results={results} />
                </div>
            </div>
        </div>
    );

};

export default TicTacToe;
