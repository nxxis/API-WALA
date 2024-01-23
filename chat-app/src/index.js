const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

const message = 'Welcome!';
io.on('connection', (socket) => {
  socket.emit('message', message);
  socket.broadcast.emit('message', 'A new user has joined');

  socket.on('sent', (messageInput, callback) => {
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback('profanity is not allowed');
    }

    io.emit('message', messageInput);
    callback();
  });

  socket.on('disconnect', () => {
    io.emit('message', 'A user has left!');
  });

  socket.on('location', (location) => {
    io.emit(
      'message',
      `https://google.com/maps?q=${location.latitude},${location.longitude}`
    );
  });
});

server.listen(port, () => {
  console.log('server is running on port ' + port);
});
