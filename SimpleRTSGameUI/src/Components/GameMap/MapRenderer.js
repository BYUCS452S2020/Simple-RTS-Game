import React from 'react';
import './MapRenderer.css';

class MapRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }
  componentDidMount() {
    this.load("http://localhost:4000/maps/1");
  }
  load = (url) => {
    fetch(url)
      .then(response => response.text())
      .then(text => { console.log(text); })
      .catch(error => { // handle error });
        this.setState({ loading: false });
      });
  }

  getTilesFromMap = (m) => {
    let tilesets = m.tilesets
    let id = 1;
    let tiles = {}
    for (let i = 0; i < tilesets.length; i++) {
      let t = tilesets[i].tiles;
      for (let j = 0; j < t.length; j++) {
        tiles[id] = t[j].image.replace("..", "Assets");
        id++;
      }
    }
    return tiles;
  }

  renderLayer = (layer) => {
    let canvas = document.getElementById(layer.name);
    let ctx = canvas.getContext("2d");
    let x, y = 0;

    let i = 0;
    if (layer.data[i]) {
      let img = new Image();
      img.src = this.tiles[layer.data[i]]
      img.onload = function() {
        console.log("drawing", layer.data[i], img.src);
        ctx.drawImage(img, x, y);
      }
    }
    x = (x + this.map.tilewidth) % (this.map.width * this.map.tilewidth);
    y = this.map.tileheight * (Math.floor(i / this.map.width));
    i = 1;
    if (layer.data[i]) {
      let img = new Image();
      img.src = this.tiles[layer.data[i]]
      img.onload = function() {
        ctx.drawImage(img, x, y);
      }
    }
    x = (x + this.map.tilewidth) % (this.map.width * this.map.tilewidth);
    y = this.map.tileheight * (Math.floor(i / this.map.width));
    i = 2;
    if (layer.data[i]) {
      let img = new Image();
      img.src = this.tiles[layer.data[i]]
      img.onload = function() {
        ctx.drawImage(img, x, y);
      }
    }
    // layer.data.forEach((id, i) => {
    //   if (id) {
    //     let img = new Image();
    //     img.src = this.tiles[layer.data[id]];
    //     img.onload = function() {
    //       console.log("drawing", id, img);
    //       ctx.drawImage(img, x, y);
    //     }
    //   }
    //   x = (x + this.map.tilewidth) % (this.map.width * this.map.tilewidth);
    //   y = this.map.tileheight * (Math.floor(i / this.map.width));
    // });
  }

  renderLayers = (layers) => {
    layers.forEach(this.renderLayer);
  }

  render() {
    if (this.state.loading) { return <div>Loading...</div> }
    if (!this.props.map) { return <div>Map not provided</div> }
    return (
      <div style={{ position: "relative" }}>
        <canvas id="Floor" style={{ zIndex: 0 }}></canvas>
        <canvas id="Environment" style={{ zIndex: 1 }}></canvas>
        <canvas id="Units" style={{ zIndex: 2 }}></canvas>
        <canvas id="Structures" style={{ zIndex: 3 }}></canvas>
      </div>
    );
  }
}

export default MapRenderer;
