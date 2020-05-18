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
    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;
    this.reCalc = this.reCalc.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
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
      event.preventDefault();
      this.army.onClick(event.layerX, event.layerY);
    });
    canvas.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      this.army.onRightClick(event.layerX, event.layerY);
    });
    canvas.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mouseup', this.onMouseUp);
    canvas.addEventListener('mousemove', this.onMouseMove);
  }


  reCalc = function() {
    let div = document.getElementById('selector');
    let x3 = Math.min(this.x1,this.x2);
    let x4 = Math.max(this.x1,this.x2);
    let y3 = Math.min(this.y1,this.y2);
    let y4 = Math.max(this.y1,this.y2);
    div.style.left = x3 + 'px';
    div.style.top = y3 + 'px';
    div.style.width = x4 - x3 + 'px';
    div.style.height = y4 - y3 + 'px';
  }


  onMouseDown = function(e) {
    console.log("down");
    e.preventDefault();
    let div = document.getElementById('selector');
    div.hidden = false;
    this.x1 = e.clientX + window.pageXOffset;
    this.y1 = e.clientY + window.pageYOffset;;
    this.reCalc();
  };
  onMouseMove = function(e) {
    console.log("move");
    e.preventDefault();
    this.x2 = e.clientX + window.pageXOffset;;
    this.y2 = e.clientY + window.pageYOffset; ;
    this.reCalc();
  };
  onMouseUp = function(e) {
    console.log("up");
    let div = document.getElementById('selector');
    div.hidden = true;
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
        id="selector"
        style={{border: "2px solid #228B22", backgroundColor: "#00FF00", opacity: 0.40, position: "absolute", zIndex: 2}}
        hidden>
      </div>
    );
  }
}

export default GameController;
