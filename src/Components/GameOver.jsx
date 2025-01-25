export default function GameOver({ winner, onRematch }) {
    return (
        <div id="game-over">
            <h2>Game Over!</h2>
            <p>{winner ? `${winner.name} won!` : "It's a Draw"}</p>
            <button onClick={onRematch} type="button">Rematch!</button>
        </div>
    )
}