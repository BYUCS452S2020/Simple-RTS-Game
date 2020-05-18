import React from 'react';
import io from 'socket.io-client';
import { Tile, Unit, Structure, Army } from './Models';

const getTileTypeFromId = (id) => {
  if (id >= 102) {
    return "unit"
  }
  else if (id >= 21 && id <= 43) {
    return "structure"
  }
  else if (id >= 84 && id <= 95) {
    return "resource"
  }
  else if (id <= 18) {
    return "resource"
  }
  else {
    return "tile"
  }
}

var x1 = 0, y1 = 0, x2 = 0, y2 = 0;

class GameController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: props.Map,
      tiles: props.Tiles,
      initialized: false,
    }
    this.mapWidth = props.Map.width * props.Map.tilewidth;
    this.mapHeight = props.Map.height * props.Map.tileheight;
    this.army = new Army();
  }

  componentDidMount() {
    const socket = io("http://localhost:4000");
    socket.on("serverMsg", data => {
      console.log(data);
    })
    this.renderLayers(this.state.map.layers);

    this.handleMouseClick();
  }

  handleMouseClick = () => {
    let canvas = document.getElementById('Foreground');
    // let ctx = canvas.getContext('2d');

    canvas.addEventListener('click', (event) => {
      this.army.onClick(event.layerX, event.layerY);
    });
    canvas.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      this.army.onRightClick(event.layerX, event.layerY);
    });
  }

  reCalc() {
    let div = document.getElementById('selector');
    let x3 = Math.min(x1,x2);
    let x4 = Math.max(x1,x2);
    let y3 = Math.min(y1,y2);
    let y4 = Math.max(y1,y2);
    div.style.left = x3 + 'px';
    div.style.top = y3 + 'px';
    div.style.width = x4 - x3 + 'px';
    div.style.height = y4 - y3 + 'px';
  }
  onMouseDown = function(e) {
    console.log("down");
    let div = document.getElementById('selector');
    div.hidden = 0;
    x1 = e.clientX;
    y1 = e.clientY;
    this.reCalc();
  };
  onMouseMove = function(e) {
    x2 = e.clientX;
    y2 = e.clientY;
    this.reCalc();
  };
  onMouseUp = function(e) {
    let div = document.getElementById('selector');
    div.hidden = 1;
  };

  getPosXFromIndex = (i) => {
    const { tilewidth, width } = this.state.map;
    return (i * tilewidth) % (tilewidth * width)
  }

  getPosYFromIndex = (i) => {
    const { tileheight, width } = this.state.map;
    return Math.floor(i / width) * tileheight;
  }

  renderLayers = (layers) => {
    if (layers) {
      layers.forEach(this.renderLayer);
    }
  }

  renderLayer = (layer) => {
    let canvas = document.getElementById(layer.name).getContext("2d");
    for (let i = 0; i < layer.data.length; i++) {
      if (layer.data[i] !== 0) {
        let x = this.getPosXFromIndex(i);
        let y = this.getPosYFromIndex(i);
        let id = layer.data[i] - 1;
        let t = this.state.tiles[id];
        let type = getTileTypeFromId(id);
        let tile = null;
        if (type === "unit") {
          tile = new Unit(t, x, y);
          this.army.addUnit(tile);
        }
        else if (type === "structure") {
          tile = new Structure(t, x, y);
        }
        else {
          tile = new Tile(t, x, y);
        }

        let img = new Image();
        img.src = 'http://localhost:4000/' + tile.image;
        img.onload = function() {
          canvas.drawImage(
            img,
            tile.x,
            tile.y,
            tile.width,
            tile.height
          );
        }
      }
    }
  }

  render() {
    return (
      <div
        id="slector"
        style={{border: "1px dotted #000", position: "absolute", zIndex: 2}}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
        hidden>
      </div>
    );
  }
}

export default GameController;
