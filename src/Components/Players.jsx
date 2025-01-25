import Player from "./Player";

export default function Players({ players, toggleEditPlayer, updatePlayer, currentPlayer }) {

    return (
        <ol id="players" className="highlight-player">
            {players.map(player =>
                <Player key={player.id}
                    isActive={player.id === currentPlayer.id}
                    player={player}
                    toggleEditPlayer={() => toggleEditPlayer(player)}
                    updatePlayer={updatePlayer}
                />)}
        </ol>
    )
}