import React from 'react';
import io from 'socket.io-client';

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
  }

  componentDidMount() {
    const socket = io("http://localhost:4000");
    socket.on("serverMsg", data => {
      console.log(data);
    })
    this.renderLayers(this.state.map.layers);
  }

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
        let id = layer.data[i] - 1;
        let tile = this.state.tiles[id];
        let x = this.getPosXFromIndex(i);
        let y = this.getPosYFromIndex(i);
        let img = new Image();
        img.src = 'http://localhost:4000/' + tile.image;
        img.onload = function() {
          canvas.drawImage(
            img,
            x,
            y,
            tile.imagewidth,
            tile.imageheight
          );
        }
      }
    }
  }

  render() {
    return <div></div>
  }
}

export default GameController;
