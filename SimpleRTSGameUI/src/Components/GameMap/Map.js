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

    var movingRight = e.clientX >= rightBoundary
    var movingLeft = e.clientX <= leftBoundary
    var movingDown = e.clientY >= bottomBoundary
    var movingUp = e.clientY <= topBoundary

    var boundaryHit = false

    if(movingUp) {
      boundaryHit = true
      if(movingRight) {
        document.body.style.cursor = "ne-resize"
      }
      else if(movingLeft) {
        document.body.style.cursor = "nw-resize"
      }
      else {
        document.body.style.cursor = "n-resize"
      }
    }
    else if(movingDown) {
      boundaryHit = true
      if(movingRight) {
        document.body.style.cursor = "se-resize"
      }
      else if(movingLeft) {
        document.body.style.cursor = "sw-resize"
      }
      else {
        document.body.style.cursor = "s-resize"
      }
    }
    else if(movingRight) {
      boundaryHit = true
      document.body.style.cursor = "e-resize"
    }
    else if(movingLeft) {
      boundaryHit = true
      document.body.style.cursor = "w-resize"
    }

    if(boundaryHit) {
      xmovement = (e.clientX * (50/259)) - (28800/259)
      ymovement = (e.clientY * (50/97)) - (20300/97)
      window.scrollBy(xmovement, ymovement)
    }
    else {
      document.body.style.cursor = "default"
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
