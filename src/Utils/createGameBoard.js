export default function createGameBoard(rows, cols, gameTurns) {
    const gameBoard = Array.from({ length: rows }, () => Array.from({ length: cols }).fill(null));

    for (let turn of gameTurns) {
        gameBoard[turn.grid.row][turn.grid.col] = turn.player.symbol;
    }
    return gameBoard;
}