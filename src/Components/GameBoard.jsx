import GameBoardSquare from "./GameBoardSquare";

export default function GameBoard({ gameBoard, onSelectSquare }) {
    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) =>
                <li key={rowIndex}>
                    <ol>
                        {row.map((symbol, colIndex) =>
                            <GameBoardSquare key={`${rowIndex},${colIndex}`}
                                onSelectSquare={() => onSelectSquare(rowIndex, colIndex)}
                                symbol={symbol}
                            />
                        )}
                    </ol>
                </li>)}
        </ol>
    );
}