import React from 'react';
import './GameFooter.css';

class Resources extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }

  // componentDidMount() {
  //
  // }
  //
  // componentWillUnmount() {
  //
  // }

  displayTroops() {
    return(
      <div className="resource-display-container">
        Troops:
        <div className="resource-row">
           <img src="https://www.w3schools.com/tags/smiley.gif" alt="Smiley face" className="resource-icon"/>
           <div className="resource-quantity">x10</div>
        </div>
        <div className="resource-row">
           <img src="https://www.w3schools.com/tags/smiley.gif" alt="Smiley face" className="resource-icon"/>
           <div className="resource-quantity">x10</div>
        </div>
        <div className="resource-row">
           <img src="https://www.w3schools.com/tags/smiley.gif" alt="Smiley face" className="resource-icon"/>
           <div className="resource-quantity">x10</div>
        </div>
      </div>
    );
  }

  displayMaterials() {
    return(
      <div className="resource-display-container">
        Materials:
        <div className="resource-row">
           <img src="https://www.w3schools.com/tags/smiley.gif" alt="Smiley face" className="resource-icon"/>
           <div className="resource-quantity">x10</div>
        </div>
        <div className="resource-row">
           <img src="https://www.w3schools.com/tags/smiley.gif" alt="Smiley face" className="resource-icon"/>
           <div className="resource-quantity">x10</div>
        </div>
        <div className="resource-row">
           <img src="https://www.w3schools.com/tags/smiley.gif" alt="Smiley face" className="resource-icon"/>
           <div className="resource-quantity">x10</div>
        </div>
      </div>
    );
  }

  displayOther() {
    return(
      <div className="resource-display-container">
        Other:
        <div className="resource-row">
           <img src="https://www.w3schools.com/tags/smiley.gif" alt="Smiley face" className="resource-icon"/>
           <div className="resource-quantity">x10</div>
        </div>
        <div className="resource-row">
           <img src="https://www.w3schools.com/tags/smiley.gif" alt="Smiley face" className="resource-icon"/>
           <div className="resource-quantity">x10</div>
        </div>
        <div className="resource-row">
           <img src="https://www.w3schools.com/tags/smiley.gif" alt="Smiley face" className="resource-icon"/>
           <div className="resource-quantity">x10</div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className='resources-container'>
        <div className="resource-row">
          <div className="resource-column">
            {this.displayTroops()}
          </div>
          <div className="resource-column">
            {this.displayMaterials()}
          </div>
          <div className="resource-column">
            {this.displayOther()}
          </div>
        </div>
      </div>
    )
  }
}
export default Resources;
