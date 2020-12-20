const express = require('express');
const app = express();
const path = require('path');


// settings
app.set('port', process.env.PORT || 3000);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// start server
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

// websockets
const SocketIO = require('socket.io');
const io = SocketIO(server);

io.on('connection', (socket) => {
    console.log('new connection', socket.id);

    socket.on('chat:message', (data) => {
        io.sockets.emit('for_all', data);
    });

    socket.on('chat:typing', (username) => {
        socket.broadcast.emit('broadcast', username);
    });
});

