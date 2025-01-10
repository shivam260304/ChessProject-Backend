// This page has all the logic for frontend index.ejs

const socket = io();
const chess = new Chess();
const boardElement = document.querySelector('.chessboard');

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard =() =>{
    const board = chess.board();
    boardElement.innerHTML = ''; // agr kuch hai is element me to pehle usse khali kardo
    console.log(board); // print board structure in conosle of client;
}

const handleMove = () => {};

const getPieceUnicode = () => {};

renderBoard();