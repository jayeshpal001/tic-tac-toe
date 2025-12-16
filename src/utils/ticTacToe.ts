type Player = "X" | "O";
type Board = (Player | null)[];

export const calculateWinnerWithLine = (
  board: Board
): { winner: Player; line: number[] } | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }

  return null;
};

export const isDraw = (board: Board): boolean =>
  board.every(cell => cell !== null);
