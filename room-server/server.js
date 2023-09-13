var express = require('express');
var socket = require('socket.io');

var app = express();

const socketOptions = {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
      }
};

server = app.listen(8080, function(){
  console.log('server is running on port 8080')
});

io = socket(server, socketOptions);

io.on('connection', (socket) => {
  socket.on('SEND_MESSAGE', function(data){
    io.emit('RECEIVE_MESSAGE', data);
  })
});