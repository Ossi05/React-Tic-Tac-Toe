import { useEffect, useState } from "react"
import GameBoard from "./GameBoard"
import Log from "./Log";
import getHasWinner from "../Utils/getHasWinner";
import GameOver from "./GameOver";
import createGameBoard from "../Utils/createGameBoard";
import getNextPlayer from "../Utils/getNextPlayer";
import GridDimension from "./GridDimension";
import Players from "./Players";

const INITIAL_PLAYERS = [
    { id: crypto.randomUUID(), name: "Player1", symbol: "X", isEditing: false },
    { id: crypto.randomUUID(), name: "Player2", symbol: "O", isEditing: false },
]

export default function Game() {
    const [players, setPlayers] = useState(JSON.parse(localStorage.getItem("players")) || INITIAL_PLAYERS);
    const [gameTurns, setGameTurns] = useState([]);
    const [gridDimensions, setGridDimension] = useState(JSON.parse(localStorage.getItem("gridDimensions")) || { rows: 3, cols: 3 });

    const gameBoard = createGameBoard(gridDimensions.rows, gridDimensions.cols, gameTurns);
    const hasWinner = gameTurns.length > 0 && getHasWinner(gameBoard, gridDimensions.rows, gridDimensions.cols);
    const isTie = gameTurns.length === gridDimensions.rows * gridDimensions.cols && !hasWinner;
    const winner = hasWinner && gameTurns[0].player;

    useEffect(() => {
        setGameTurns(turns => {
            return turns.map(turn => {
                for (let player of players) {
                    if (turn.player.id === player.id) {
                        return { ...turn, player };
                    }
                }
                return turn;
            });
        });
        // Save players to local storage
        localStorage.setItem(
            "players",
            JSON.stringify(players)
        );
    }, [players]);
    useEffect(() => { // Save gridDimensions to local storage
        localStorage.setItem(
            "gridDimensions",
            JSON.stringify(gridDimensions)
        );
    }, [gridDimensions]);

    const onSelectSquare = (rowIndex, colIndex) => {
        if (hasWinner) { return; }
        setGameTurns(turns => {
            const turnExists = turns.some(turn =>
                turn.grid.row === rowIndex && turn.grid.col === colIndex
            );
            if (!turnExists) {
                const activePlayer = getNextPlayer(turns, players);
                return [
                    { grid: { row: rowIndex, col: colIndex }, player: activePlayer },
                    ...turns
                ];
            }
            return turns;
        });
    }
    const goBackToTurn = targetTurn => {
        setGameTurns(turns => {
            const targetIndex = turns.findIndex(t => t === targetTurn);
            if (targetIndex === -1) {
                return turns;
            }
            return turns.slice(targetIndex);
        });
    }
    const updatePlayer = (player, updatedFields) => {
        setPlayers(currentPlayers =>
            currentPlayers.map(p =>
                p === player ? { ...p, ...updatedFields } : p
            )
        );
    };
    const toggleEditPlayer = player => {
        setPlayers(currentPlayers => {
            return currentPlayers.map(p => {
                return p === player ? { ...p, isEditing: !p.isEditing } : { ...p, isEditing: false };
            });
        });
    }
    const resetGame = () => {
        setGameTurns([]);
    }
    const changeGridDimensions = newGridValue => {
        setGridDimension(currentGrid => ({ ...currentGrid, ...newGridValue }));
        resetGame();
    }

    const currentPlayer = getNextPlayer(gameTurns, players);

    return (<main>
        <div id="game-container">
            <Players currentPlayer={currentPlayer} players={players} toggleEditPlayer={toggleEditPlayer} updatePlayer={updatePlayer} />
            <GridDimension gridDimensions={gridDimensions} changeGridDimensions={changeGridDimensions} />

            {(isTie || hasWinner) &&
                <GameOver winner={winner} onRematch={resetGame} />
            }
            <GameBoard gameBoard={gameBoard} onSelectSquare={onSelectSquare} />

        </div>
        <Log gameTurns={gameTurns} onTurnClick={goBackToTurn} />
    </main>)
}