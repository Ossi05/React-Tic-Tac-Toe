export default function Log({ gameTurns, onTurnClick }) {

    return (
        <ol id="log">
            {gameTurns.map((turn, index) => {
                return <li onClick={() => onTurnClick(turn)} key={`${turn.grid.row}${turn.grid.col}`}>
                    {gameTurns.length - index}. {turn.player.name} {`[${turn.grid.row + 1} , ${turn.grid.col + 1}]`}
                </li>
            })}
        </ol>
    );
}