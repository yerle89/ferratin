const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

const connected_users = new Map();
const typing_users = new Map();

function get_connected_users() {
  const res_connected_users = [];
  for (const [socket_id, nickname] of connected_users) {
    res_connected_users.push({
      id: socket_id,
      nickname: nickname
    });
  }
  return res_connected_users;
}

function get_typing_users() {
  const res_typing_users = [];
  for (const [socket_id, nickname] of typing_users) {
    res_typing_users.push({
      id: socket_id,
      nickname: nickname
    });
  }
  return res_typing_users;
}

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {

  socket.on('on_connected_user', data => {
    connected_users.set(socket.id, data.nickname);
    const res_connected_users = get_connected_users();
    io.sockets.emit('connected_users', res_connected_users);
    const res_typing_users = get_typing_users();
    io.sockets.emit('typing_users', res_typing_users);
  });

  socket.on('disconnect', () => {
    connected_users.delete(socket.id);
    const res_connected_users = get_connected_users();
    socket.broadcast.emit('connected_users', res_connected_users);
  });

  socket.on('send_text_message_to_server', data => {
    socket.broadcast.emit('broadcast_text_message', data);
  });

  socket.on('on_start_typing', data => {
    typing_users.set(socket.id, data.nickname);
    const res_typing_users = get_typing_users();
    io.sockets.emit('typing_users', res_typing_users);
  });

  socket.on('on_finish_typing', () => {
    typing_users.delete(socket.id);
    const res_typing_users = get_typing_users();
    io.sockets.emit('typing_users', res_typing_users);
  });

});

http.listen(3000, function () {
  console.log('listening on *:3000');
});
