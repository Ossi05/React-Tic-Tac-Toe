export default function Player({ player, isActive, toggleEditPlayer, updatePlayer }) {

    const toggleIsEditingPlayerName = () => {
        toggleEditPlayer();
    }

    const onChange = (e) => {
        let { name, value } = e.target;
        updatePlayer(player, { [name]: value });
    }

    return (
        <li className={isActive ? "active" : ""}>
            <span className="player">
                {player.isEditing ?
                    <input type="text" id="playerName" name="name" onChange={onChange}
                        onBlurCapture={(e) => { !e.relatedTarget && toggleIsEditingPlayerName() }}
                        value={player.name} autoFocus required
                    /> :
                    <span onClick={toggleIsEditingPlayerName} className="player-name">{player.name}</span>
                }
                {player.isEditing ?
                    <input className="player-symbol-input" type="text" id="playerSymbol" name="symbol" onChange={onChange}
                        onBlurCapture={(e) => { !e.relatedTarget && toggleIsEditingPlayerName() }}
                        value={player.symbol} required
                    /> :
                    <span onClick={toggleIsEditingPlayerName} className="player-symbol">{player.symbol}</span>
                }
            </span>
            <button onClick={toggleIsEditingPlayerName} type="button" id={player.isEditing ? "saveButton" : "editButton"}>{player.isEditing ? "Save" : "Edit"}</button>
        </li>
    )
}