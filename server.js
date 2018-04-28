// The below code creates a simple HTTP server with the NodeJS `http` module,
// and makes it able to handle websockets. However, currently it does not
// actually have any websocket functionality - that part is your job!

//var http = require('http');

var express = require('express');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.engine('html', require('ejs').__express);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket){
  console.log('a user connected');
  
  socket.on('select_piece', function (data) {
	console.log(data);
	socket.broadcast.emit('selected', data);
  });

  socket.on('deselect', function () {
  	socket.broadcast.emit('deselected');
  });

  socket.on('clear', function () {
  	socket.broadcast.emit('cleared');
  });

  socket.on('move', function (data) {
  	socket.broadcast.emit( 'moved', data);
  });

  socket.on('jump_again', function (data) {
  	socket.broadcast.emit('jumped_again', data);
  });

  socket.on('remove', function (data) {
  	socket.broadcast.emit('removed', data);
  });

  socket.on("clientMsg", function (data) {
    //send the data to the current client requested/sent.
    socket.emit("serverMsg", data);
    //send the data to all the clients who are accessing the same site(localhost)
    socket.broadcast.emit("serverMsg", data);
  });


  socket.on('disconnect', function (){
    console.log('user disconnected');
  });
});

http.listen(3000, function (){
  console.log('listening on *:3000');
});

