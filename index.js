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

io.on('connection', socket => {

  console.log('a user connected');

  socket.on('orientation-change', (event) => {
    console.log(event);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});

server.listen(PORT, () => console.log(`Draw-Something is running on: ${PORT}`));