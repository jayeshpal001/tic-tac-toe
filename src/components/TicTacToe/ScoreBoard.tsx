type Player = "X" | "O";

interface ScoreBoardProps {
  players: Record<Player, string>;
  score: {
    X: number;
    O: number;
    draw: number;
  };
}

const ScoreBoard = ({ players, score }: ScoreBoardProps) => {
  return (
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
  );
};

export default ScoreBoard;
