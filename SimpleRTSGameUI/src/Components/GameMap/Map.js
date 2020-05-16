import React from 'react';
import PropTypes from 'prop-types';
import GameLoader from '../../Game/GameLoader';
import './GameMap.css';
import '../../JqueryPlugins/jquery.event.drag-2.2.js'
import '../../JqueryPlugins/jquery.event.drag.live-2.2.js'
import $ from 'jquery';
import jQuery from 'jquery'

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

    this.mouseMove = this.mouseMove.bind(this);
  }

  // <script src="./JqueryPlugins/jquery.event.drag-2.2.js" type="text/javascript"></script>
  // <script src="./JqueryPlugins/jquery.event.drag.live-2.2.js" type="text/javascript"></script>
  // <script src="./JqueryPlugins/jquery.event.drop-2.2.js" type="text/javascript"></script>
  // <script src="./JqueryPlugins/jquery.event.drop.live-2.2.js" type="text/javascript"></script>

  componentDidMount() {
    window.addEventListener("mousemove", this.mouseMove);
    // const jQueryScript = document.createElement("script");
    // jQueryScript.src = "http://threedubmedia.com/inc/js/jquery-1.7.2.js";
    // jQueryScript.async = true;
    // const dragScript = document.createElement("script");
    // dragScript.src = "../../../public/JqueryPlugins/jquery.event.drag-2.2.js";
    // dragScript.type = "text/javascript"
    // dragScript.async = true;
    // const dragLiveScript = document.createElement("script");
    // dragLiveScript.src = "../../../public/JqueryPlugins/jquery.event.drag.live-2.2.js";
    // dragLiveScript.type = "text/javascript"
    // dragLiveScript.async = true;
    //document.body.appendChild(jQueryScript);
    // document.body.appendChild(dragScript);
    // document.body.appendChild(dragLiveScript);
    jQuery(function($){
      $( document )
        .drag("start",function( ev, dd ){
          return $('<div class="selection-box" />')
            .css('opacity', .30 )
            .appendTo( document.body );
        })
        .drag(function( ev, dd ){
          $( dd.proxy ).css({
            top: Math.min( ev.pageY, dd.startY ),
            left: Math.min( ev.pageX, dd.startX ),
            height: Math.abs( ev.pageY - dd.startY ),
            width: Math.abs( ev.pageX - dd.startX )
          });
        })
        .drag("end",function( ev, dd ){
          console.log("dd",dd);
          console.log("ev",ev);
          $( dd.proxy ).remove();
        });
    });
  }

  mouseMove = e => {

    var rightBoundary = window.innerWidth * .95
    var leftBoundary = 50
    var bottomBoundary =  (window.innerHeight * .97)
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
        className={rootClass}>
        <GameLoader/>
      </div>

    )
  }
}

Map.defaultProps = {
  ref: { current: { } },
  rootClass: 'map-container',
};

Map.propTypes = {
  ref: PropTypes.object,
  rootClass: PropTypes.string,
  children: PropTypes.string,
};

export default Map;
