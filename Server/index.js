const express = require('express');
const cors = require('cors');
const app = express();
const serv = require('http').Server(app);
const PORT = 4000;

app.use(cors());

app.get('/', function(req, res) {
	res.send('Simple RTS Backend');
});
app.get('/Sample.png', function(req, res) {
	res.sendFile(__dirname + '/Sample.png');
})
app.get('/maps/:mapId', function(req, res) {
  res.sendFile(__dirname + '/maps/level' + req.params.mapId + '.json');
});
app.get('/tiles/:name?', function(req, res) {
	let name = req.params.name;
	if (!name) {
		res.sendFile(__dirname + '/maps/AllTiles.json');
	}
	else if (name === "AllTiles.json") {
		res.sendFile(__dirname + '/maps/AllTiles.json');
	}
	else {
		res.sendFile(__dirname + '/maps/tiles/' + name);
	}
});

serv.listen(PORT);
console.log(`server listening on port ${PORT}`);

var SOCKET_LIST = {};

var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
    socket.id = Math.random();
    socket.x = 0;
    socket.y = 0;
    socket.number = "" + Math.floor(10 * Math.random());
    SOCKET_LIST[socket.id] = socket;

		socket.emit('serverMsg', {
			msg: "Your socket id is " + socket.id
		})

    socket.on('disconnect',function(){
        delete SOCKET_LIST[socket.id];
    });

});

setInterval(function(){
    var pack = [];
    for(var i in SOCKET_LIST){
        var socket = SOCKET_LIST[i];
        socket.x++;
        socket.y++;
        pack.push({
            x:socket.x,
            y:socket.y,
            number:socket.number
        });
    }
    for(var i in SOCKET_LIST){
        var socket = SOCKET_LIST[i];
        socket.emit('newPositions',pack);
    }
},1000/25);
