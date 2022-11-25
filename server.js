const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, '/build')));

app.use(express.json());

const rooms = new Map();

app.get('/rooms/:id', (req, res) => {
  const { id: recipientName } = req.params;
  const obj = rooms.has(recipientName)
    ? {
      users: [...rooms.get(recipientName).get('users').values()],
      messages: [...rooms.get(recipientName).get('messages').values()],
    }
    : { users: [], messages: [] };
  res.json(obj);
});

app.post('/rooms', (req, res) => {
  const { recipientName } = req.body;
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
    socket.broadcast.to(recipientName).emit('ROOM:SET_USERS', users);
  });

  socket.on('ROOM:NEW_MESSAGE', ({ recipientName, senderName, text, date, topic }) => {
    const obj = {
      senderName,
      text,
      date,
      topic
    };
    rooms.get(recipientName).get('messages').push(obj);
    socket.broadcast.to(recipientName).emit('ROOM:NEW_MESSAGE', obj);
  });

  socket.on('disconnect', () => {
    rooms.forEach((value, recipientName) => {
      if (value.get('users').delete(socket.id)) {
        const users = [...value.get('users').values()];
        socket.broadcast.to(recipientName).emit('ROOM:SET_USERS', users);
      }
    });
  });
});

server.listen(PORT, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log('Server launched')
});