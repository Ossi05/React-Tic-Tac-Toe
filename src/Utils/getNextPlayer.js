export default function getNextPlayer(gameTurns, players) {
    const previousPlayerIndex = gameTurns[0] ? players.findIndex(p => p.id === gameTurns[0].player.id) : -1;
    const nextPlayerIndex = (previousPlayerIndex + 1) % players.length;
    return players[nextPlayerIndex];
}