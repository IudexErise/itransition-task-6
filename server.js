const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.json());

const rooms = new Map();

app.get('/rooms', (req, res) => {
  res.json(rooms);
});

app.post('/rooms', (req, res) => {
  const { senderName, recipientName } = req.body;
  if (!rooms.has(recipientName)) {
    rooms.set(
      recipientName,
      new Map([
        ['users', new Map()],
        ['messages', []]
      ]),
    );
  }
  res.send();
});

io.on('connection', (socket) => {
  socket.on('ROOM:JOIN', ({ recipientName, senderName }) => {
    socket.join(recipientName);
    rooms.get(recipientName).get('users').set(socket.id, senderName);
    const users = [...rooms.get(recipientName).get('users').values()];
    socket.broadcast.to(recipientName).emit('ROOM:JOINED', users);
  });

  console.log('user connected', socket.id)
})

server.listen(7777, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log('Server launched')
});