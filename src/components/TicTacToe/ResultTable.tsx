type Player = "X" | "O";

interface ResultItem {
  id: number;
  result: "WIN" | "DRAW";
  winnerName?: string;
  symbol?: Player;
}

interface ResultTableProps {
  results: ResultItem[];
}

const ResultTable = ({ results }: ResultTableProps) => {
  if (results.length === 0) return null;

  return (
    <div className="mt-6 text-left">
      <h2 className="text-lg font-semibold mb-2">
        Match Results
      </h2>

      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">#</th>
            <th className="border px-2 py-1">Result</th>
            <th className="border px-2 py-1">Winner</th>
            <th className="border px-2 py-1">Symbol</th>
          </tr>
        </thead>

        <tbody>
          {results.map((row) => (
            <tr key={row.id} className="text-center">
              <td className="border px-2 py-1">{row.id}</td>
              <td className="border px-2 py-1">{row.result}</td>
              <td className="border px-2 py-1">
                {row.winnerName ?? "-"}
              </td>
              <td className="border px-2 py-1">
                {row.symbol ?? "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultTable;
