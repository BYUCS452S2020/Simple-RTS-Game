import React from 'react';
import PropTypes from 'prop-types';
import './GameMap.css';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      isScrolling: false,
      clientX:0,
      clientY: 0,
      scrollX: 0,
      scrollY: 0
    };
  }

  onMouseMove = e => {

    var rightBoundary = window.innerWidth * .95
    var leftBoundary = 50
    var bottomBoundary =  (window.innerHeight * .74)
    var topBoundary = 50
    var xmovement = 0;
    var ymovement = 0;

    if(e.clientX >= rightBoundary || e.clientX <= leftBoundary || e.clientY >= bottomBoundary || e.clientY <= topBoundary) {
      xmovement = (e.clientX * (50/259)) - (28800/259)
      ymovement = (e.clientY * (50/97)) - (20300/97)

      window.scrollBy(xmovement, ymovement);
    }
  }

  render() {
    const { ref, rootClass } = this.props;
    return (
      <div
        ref={ref}
        onMouseMove={this.onMouseMove}
        className={rootClass}>
        <img id="map" ref={this.ref}  className="map" src="https://bnetcmsus-a.akamaihd.net/cms/gallery/TQWOWDJLTULR1500412537725.jpg"/>
      </div>
    )
  }
}

Map.defaultProps = {
  ref: { current: { } },
  rootClass: '',
};

Map.propTypes = {
  ref: PropTypes.object,
  rootClass: PropTypes.string,
  children: PropTypes.string,
};

export default Map;
