import React from 'react';
import './GameFooter.css';

class MiniMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    let array = window.location.href.split('/');
    this.mapId = array[array.length - 1];
  }

  render() {
    return (
      <div className="minimap-container">
        <img src={window.location.origin + '/maps/level' + this.mapId + ".png"} alt="smiley face" className='minimap-background'/>
      </div>
    )
  }
}
export default MiniMap;
