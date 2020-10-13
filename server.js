const express = require('express');

const path = require('path');

const http = require('http');

const socket = require('socket.io');

const app = express();

const server = http.createServer(app);

const io = socket(server);

io.on('connection' , (socket) => {
    console.log('new connection');

    socket.emit( 'message' , 'Welcome new user');

    socket.broadcast.emit('message' , 'A user has joined the chat');

    socket.on('disconnect' , () => {
        io.emit('message' , 'user has left the chat');
    });

    socket.on('chatMessage' , (msg) => {
        io.emit('message' , msg);
    })
});


app.use(express.static(path.join(__dirname , 'public')));

const PORT = 3000 || process.env.PORT ;

server.listen(PORT , () => {
    console.log('Server running !');
})