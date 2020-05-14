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
  }

  componentDidMount() {
    const socket = io("http://localhost:4000");
    socket.on("serverMsg", data => {
      console.log(data);
    })
    this.renderLayers(this.state.map.layers);
  }

  renderLayers = (layers) => {
    if (layers) {
      layers.forEach(this.renderLayer);
    }
  }

  renderLayer = (layer) => {
    let canvas = document.getElementById(layer.name).getContext("2d");
    if (layer.data[0] !== 0) {
      let id = layer.data[0] - 1;
      let tile = this.state.tiles[id];
      let img = new Image();
      img.src = 'http://localhost:4000/' + tile.image;
      console.log("drawing image", img.src, tile.imagewidth, tile.imageheight);
      img.onload = function() {
        canvas.drawImage(img, 0, 0, tile.imagewidth, tile.imageheight, 0, 0, 1, 1);
      }
    }
  }

  render() {
    return <div></div>
  }
}

export default GameController;
