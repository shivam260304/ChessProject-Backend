// This page has all the logic for frontend index.ejs

const socket = io();
const chess = new Chess();
const boardElement = document.querySelector('.chessboard');

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = '';

    board.forEach((row, rowIndex) => {
        row.forEach((square, squareIndex) => {      // here square represents piece

            // Giving color to the boxes
            const squareElement = document.createElement('div');
            squareElement.classList.add('square',
                (rowIndex + squareIndex) % 2 === 0 ? 'light' : 'dark'
            );

            squareElement.dataset.row = rowIndex;
            squareElement.dataset.col = squareIndex;

            if (square) {
                const pieceElemnt = document.createElement('div');
                pieceElemnt.classList.add('piece', square.color === 'w' ? 'white' : 'black');
                pieceElemnt.innerText = getPieceUnicode(square); // Use the function here
                pieceElemnt.draggable = playerRole === square.color;  // square.color means piece.color refer to line 16
            
                pieceElemnt.addEventListener('dragstart', (e) => {
                    if (pieceElemnt.draggable) {
                        draggedPiece = pieceElemnt;
                        sourceSquare = {
                            row: rowIndex,
                            col: squareIndex
                        };
                        e.dataTransfer.setData('text/plain', "");
                    }
                });
            
                pieceElemnt.addEventListener('dragend', (e) => {
                    draggedPiece = null;
                    sourceSquare = null;
                });
            
                squareElement.appendChild(pieceElemnt);
            }
            

            // To prevent dragging on an empty square
            squareElement.addEventListener('dragover', (e) => {
                e.preventDefault();
            });

            squareElement.addEventListener('drop', (e) => {
                e.preventDefault();
                if(draggedPiece){
                    const targetSquare = {
                        row: parseInt(squareElement.dataset.row),
                        col: parseInt(squareElement.dataset.col)
                    };
                    
                    handleMove(sourceSquare, targetSquare );
                }
            });

            boardElement.appendChild(squareElement);

        });
    });

    
};

const handleMove = () => {};

const getPieceUnicode = (piece) => {
    if (!piece) return '';

    const unicodeMap = {
        p: { w: '♙', b: '♟' },
        r: { w: '♖', b: '♜' },
        n: { w: '♘', b: '♞' },
        b: { w: '♗', b: '♝' },
        q: { w: '♕', b: '♛' },
        k: { w: '♔', b: '♚' }
    };

    return unicodeMap[piece.type][piece.color];
};


renderBoard();
