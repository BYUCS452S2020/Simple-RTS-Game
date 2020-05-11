
import React from 'react';

var map = require("../../Assets/Maps/Level1.json");
function getTilesFromMap(m) {
  let tilesets = m.tilesets
  let id = 1;
  let tiles = {}
  for (let i = 0; i < tilesets.length; i++) {
    let t = tilesets[i].tiles;
    for (let j = 0; j < t.length; j++) {
      tiles[id] = new Image();
      tiles[id].src = t[j].image.replace("..", "../../Assets");
      id++;
    }
  }
  return tiles;
}
var tiles = getTilesFromMap(map);

class MapRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }
  componentDidMount() {
    this.renderLayers(map.layers);
  }
  componentDidUpdate(prevProps) {

  }
  renderLayer = (layer) => {
    if (layer.type !== "tilelayer" || !layer.opacity) { return; }
    let c = document.getElementById("canvas").getContext("2d");
    console.log(c);
    if (layer.data[0] !== 0) {
      // console.log(layer.data[0]);
      console.log(tiles[58]);
      c.drawImage(tiles[58], 0, 0);
    }

    // c.drawImage(layer.data[0], 0, 0);
    // let s = c.canvas.cloneNode();
    // let size = this.map.tilewidth;
    // s = s.getContext("2d");

    // if (scene.layers.length < scene.data.layers.length) {
    //   layer.data.forEach(function(tile_idx, i) {
    //     if (!tile_idx) { return; }
    //     var img_x, img_y, s_x, s_y,
    //           tile = scene.data.tilesets[0];
    //     tile_idx--;
    //     img_x = (tile_idx % (tile.imagewidth / size)) * size;
    //     img_y = ~~(tile_idx / (tile.imagewidth / size)) * size;
    //     s_x = (i % layer.width) * size;
    //     s_y = ~~(i / layer.width) * size;
    //     s.drawImage(scene.tileset, img_x, img_y, size, size,
    //                         s_x, s_y, size, size);
    //   });
    //   scene.layers.push(s.canvas.toDataURL());
    //   c.drawImage(s.canvas, 0, 0);
    // }
    // else {
    //   scene.layers.forEach(function(src) {
    //     var i = $("<img />", { src: src })[0];
    //     c.drawImage(i, 0, 0);
    //   });
    // }
  }

  renderLayers = (layers) => {
    layers = Array.isArray(layers) ? layers : []
    layers.forEach(this.renderLayer);
  }

  render() {
    if (!this.props.map) { return <div></div> }
    return (
      <canvas id="canvas">
      </canvas>
    )
  }
}

export default MapRenderer;
