const app = require('express')();
const { createServer } = require('http');
const { Server } = require('socket.io');

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log(`Socket: ${socket}`);
  console.log('Socket is active to be connected');

  socket.on('chat', (payload) => {
    console.log(`Payload: ${payload}`);
    io.emit('chat', payload); // broadcasting
  });
});

httpServer.listen(5000, () =>
  console.log('Server is listening at port 5000...')
);
