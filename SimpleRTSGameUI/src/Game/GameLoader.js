import React from 'react';
import GameController from './GameController';

class GameLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: {},
      tiles: []
    }
    let array = window.location.href.split('/');
    this.mapId = array[array.length - 1]
  }

  componentDidMount() {
    this.load();
  }

  load = () => {
    this.loadMap();
    this.loadTiles();
  }

  loadMap = () => {
    fetch(window.location.origin + '/maps/level' + this.mapId + '.json')
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        this.setState({ map: data });
      })
      .catch(error => { console.log(error); });
  }

  loadTiles = () => {
    fetch(window.location.origin + '/maps/AllTiles.json')
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        this.setState({ tiles: data.tiles });
      })
      .catch(error => { console.log(error); })
  }

  isLoading = () => {
    const { map, tiles } = this.state;
    if (map.type && tiles.length > 0) {
      return false;
    }
    return true;
  }

  render() {
    if (this.isLoading()) { return <div>Loading...</div> }
    else {
      const { map, tiles } = this.state;
      return (
        <div style={{ position: "relative", height: (map.height * map.tileheight), paddingBottom: "20vh" }}>
          <GameController Map={map} Tiles={tiles}/>
          <canvas
            id="Background"
            height={map.height * map.tileheight}
            width={map.width * map.tilewidth}
            style={{ zIndex: 0 }} >
          </canvas>
          <canvas
            id="Foreground"
            height={map.height * map.tileheight}
            width={map.width * map.tilewidth}
            style={{ zIndex: 100 }}>
          </canvas>
        </div>
      );
    }
  }
}

export default GameLoader;
