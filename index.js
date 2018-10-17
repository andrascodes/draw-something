const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.SERVER_PORT;

const app = express();
const server = require('http').Server(app);
const io = socketIO(server);

app.use(express.static('public'));

app.get('/canvas', function (req, res) {
  res.sendFile(__dirname + '/public/canvas.html');
});

app.get('/palette', function (req, res) {
  res.sendFile(__dirname + '/public/palette.html');
});

const palettes = io
  .of('/palette')
  .on('connection', (socket) => {
    console.log('a user connected to palette');

    socket.on('line-size-change', data => {
      console.log(data);
      io.emit('line-size-change', data);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected from palette');
    });
  });

const canvases = io
  .of('/canvas')
  .on('connection', (socket) => {
    console.log('a user connected to canvas', socket);

    socket.on('disconnect', () => {
      console.log('user disconnected from canvas');
    });
  });

// const canvases = [{
//   id: 1,

// }, ...]

// const sprays = [{
//   size: 10,
//   color: "#hex",
//   canvas: 1,
// }, ...]

server.listen(PORT, () => console.log(`Draw-Something is running on: ${PORT}`));