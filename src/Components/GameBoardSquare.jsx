export default function GameBoardSquare({ symbol, onSelectSquare }) {
    return (
        <li>
            <button onClick={onSelectSquare} disabled={!!symbol} >{symbol}</button>
        </li>
    )
}