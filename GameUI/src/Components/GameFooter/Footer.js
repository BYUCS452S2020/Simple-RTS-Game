import React from 'react';
import './GameFooter.css';
import PillageCaptainPortrait from './PillageCaptainPortrait'
import Resources from './Resources'
import MiniMap from './MiniMap'

class Footer extends React.Component {

  render() {
    return (
      <div>
        <div className='footer-background'>
          <PillageCaptainPortrait/>
          <Resources/>
        </div>
        <MiniMap/>
      </div>
    )
  }
}
export default Footer;
