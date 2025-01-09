const express = require('express');
const socket = require('socket.io');
const http = require('http');
const {Chess} = require('chess.js');   // we only need chess class
const path = require('path');

const app = express();

const server = http.createServer(app);
const io = socket(server);

const chess = new Chess(); 

let players = {};
let currentPlayer = 'W';

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public'))); 

app.get('/', (req, res) => {
    res.render('index');
});

io.on('connection', (uniquesocket) => {
    console.log('server socket connected');

    if(!players.white){
        players.white = uniquesocket.id;
        uniquesocket.emit("playerRole", "W");
    }
    else if (!players.black){
        players.black = uniquesocket.id;
        uniquesocket.emit("playerRole", "B");
    }
    else{
        uniquesocket.emit("spectatorRole")
    }

    uniquesocket.on('disconnect', ()=>{
        if(uniquesocket.id === players.white){
            delete players.white;
        }
        else if (uniquesocket.id === players.black){
            delete players.black;
        }
    })
})


server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

