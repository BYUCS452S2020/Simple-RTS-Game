const express = require('express');
const cors = require('cors');
const app = express();
const serv = require('http').Server(app);
const Dao = require('./db/dao.js');
const Dbms = require('./db/dbms.js');
const PORT = 4000;

const dao = new Dao('./db/database.sqlite');
const dbms = new Dbms(dao);

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
app.get('/maps/:mapId/preview', function(req, res) {
	res.sendFile(__dirname + '/maps/level' + req.params.mapId + '.png');
})
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

app.post('/login', function(req, res){
    console.log("recieved")
    let username = req.params.username;
    let password = req.params.password;
    res.send({message: "It worked" });
});

app.post('/register', function(req, res){
    console.log("recieved register request");

    let email = req.params.email;
    let password = req.params.password;
    let username = req.params.username;
    let firstName = req.params.firstName;
    let lastName = req.params.lastName;

    res.status(200).send({message: "It worked" });
});

app.get('/users', async function(req, res) {
	res.status(200).send(await dbms.getUsers());
})

app.get('troops', async function(req, res) {
	res.status(200).send(await dbms.getTroops());
})

app.post('troops', async function(req, res) {
	const { name, type, health, speed, attack } = req.params;
	if (name && type && health && speed && attack) {
		res.status(200).send(await dbms.addTroop(name, type, health, speed, attack));
	}
	else {
		res.status(400).send("Bad Parameters (need name, type, health, speed, and attack)")
	}
})

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
