const express = require('express');

const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})
const cors = require("cors");

app.use(express.json());

const rooms = new Map();

app.use(cors())

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
      ]));
  }
  res.send();
});

io.on('connection', socket => {
  console.log('user connected', socket.id)
})

server.listen(9999, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log('Server launched')
});