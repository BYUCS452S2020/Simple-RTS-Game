import React from 'react';
import './GameFooter.css';

class MiniMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="minimap-container">
        <img src="https://starcraft.blizzplanet.com/wp-content/uploads/2020/01/starcraft-brood-war-the-insurgent-mini-map.jpg" alt="smiley face" className='minimap-background'/>
      </div>
    )
  }
}
export default MiniMap;
