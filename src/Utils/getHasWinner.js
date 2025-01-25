export default function getHasWinner(gameBoard, rows, cols) {
    let hasWinner = false;
    for (let i = 0; i < gameBoard.length; i++) {
        const row = gameBoard[i];
        if (row.every(symbol => symbol && row[0] === symbol)) { // Horizontal
            hasWinner = true;
            break;
        }
        for (let x = 0; x < row.length; x++) { // Vertical & Diagonal
            const verticalSymbols = [];
            const diagonalSymbols = [];
            const calculateDiagonal = rows === cols && (x === 0 || x === row.length - 1);
            let diagonalX = x === 0 ? 0 : row.length - 1;
            const isDirectionRight = diagonalX === 0;
            for (let y = 0; y < gameBoard.length; y++) {
                if (calculateDiagonal) {
                    diagonalSymbols.push(gameBoard[y][diagonalX]);
                    diagonalX += isDirectionRight ? 1 : -1;
                }
                verticalSymbols.push(gameBoard[y][x]);
            }
            if (verticalSymbols.every(symbol => symbol && verticalSymbols[0] === symbol) || (diagonalSymbols.length && diagonalSymbols.every(symbol => symbol && diagonalSymbols[0] === symbol))) {
                hasWinner = true;
                break;
            }
        }

        if (hasWinner) { break; }
    }
    return hasWinner;
}