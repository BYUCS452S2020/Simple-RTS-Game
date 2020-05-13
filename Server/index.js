const express = require('express');
const cors = require('cors');
const sql = require('sqlite3');
const app = express();
app.use(cors);
const PORT = 4000;

var db = new sql.Database('./db/database.sqlite');

app.get('/', (req, res) => {
  console.log("root");
  res.send("Simple RTS Backend");
});

app.get('/maps/:mapId', (req, res) => {
  console.log("map", req.params.mapId);
  res.sendFile(__dirname + '/Assets/Maps/Level' + req.params.mapId + '.json');
});

/*
I'm thinking we need an endpoint to load all the tile images here
{
  id: 1, src: req.address.address + '/Assets/PNG/retina/img0.png',
  id: 2, src: req.address.address + '/Assets/PNG/retina/img1.png',
}
*/

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
})
