const express = require('express');
const cors = require('cors');
const app = express();
const serv = require('http').Server(app);
const PORT = 4000;
// const sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('./db/database.sqlite', (err) => {
//     if (err){
//         console.error(err.message);
//     }
//     console.log('Connected to database');
// });

// db.serialize(function() {
//     db.run('CREATE TABLE IF NOT EXISTS avatar( avatar_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, happy BLOB, mad	BLOB, mocking BLOB )');
//     db.run('CREATE TABLE IF NOT EXISTS building(building_id INTEGER, owner INTEGER, location_x INTEGER, location_y INTEGER, health INTEGER, name TEXT, PRIMARY KEY(building_id))');
//     db.run('CREATE TABLE IF NOT EXISTS inventory ( inventory_id INTEGER, owner INTEGER, wood INTEGER, stone INTEGER, gold INTEGER, FOREIGN KEY(owner) REFERENCES user(user_id), PRIMARY KEY(inventory_id))');
//     db.run('CREATE TABLE IF NOT EXISTS resource ( resource_id	INTEGER PRIMARY KEY AUTOINCREMENT, location_x INTEGER, location_y INTEGER, type TEXT, amount INTEGER)');
//     db.run('CREATE TABLE IF NOT EXISTS troop (troop_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, owner INTEGER, name TEXT, type INTEGER, location_x INTEGER, location_y INTEGER, health INTEGER, speed INTEGER, attack INTEGER, FOREIGN KEY(owner) REFERENCES user(user_id))');
//     db.run('CREATE TABLE IF NOT EXISTS user ( user_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, password TEXT NOT NULL, salt TEXT, last_name TEXT, email TEXT, avatar_id INTEGER, FOREIGN KEY(avatar_id) REFERENCES avatar(avatar_id) )');
// })

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
