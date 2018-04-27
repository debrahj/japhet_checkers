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




/*

//Generate room name
//var rroom = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
//var testroom = 'abc123';


//var socketServer = io(server);
//var nsp = socketServer.of('/'+testroom);

io.on( 'connection', function(socket) {

	socket.on('room', function(room) {
		socket.join(room);
	});

	var chat = socketServer.sockets.in(testroom);

	socket.on('select', function(data) {
		chat.broadcast.emit('selected', data);
	});

	socket.on('move', function(data) {
		chat.broadcast.emit('moved', data);
	});

	socket.on('clear', function() {
		chat.broadcast.emit('cleared');
	});

	socket.on('deselect', function(data) {
		chat.broadcast.emit('deselected', data);
	});

	socket.on('jump_again', function(data) {
		chat.broadcast.emit('jumped_again', data);
	});

	socket.on('message', function(data) {
		
	});


});*/
 
 var messages = {};
// Your code goes here:

