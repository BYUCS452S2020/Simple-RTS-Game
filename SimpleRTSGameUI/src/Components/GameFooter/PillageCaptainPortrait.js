import React from 'react';
import './GameFooter.css';
import BulmaHappy from "../../BulmaHappy.png";
import BulmaAngry from "../../BulmaAngry.png";
import BulmaMocking from "../../BulmaMocking.png";

class PillageCaptainPortrait extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portraitImage: {
        "happy": BulmaHappy,
        "angry": BulmaAngry,
        "mocking": BulmaMocking
      },
      currentPortrait: BulmaHappy
    }
    this.getPortrait = this.getPortrait.bind(this);
  }

  componentDidMount() {
    this.happy = setInterval(()=>{this.changeReaction("happy")}, 10000);
    this.angry = setInterval(()=>{this.changeReaction("angry")}, 4000);
    this.mocking = setInterval(()=>{this.changeReaction("mocking")}, 7000);
  }

  componentWillUnmount() {
    clearInterval(this.happy);
    clearInterval(this.angry);
    clearInterval(this.mocking);
  }

  changeReaction(reaction) {
    this.setState({
      currentPortrait: this.state.portraitImage[reaction]
    })
  }

  getPortrait() {
    let url = "http://localhost:8080/sky/cloud/J7n4VhYgFcYR7uSoaBQqBT/pillage_no_village.profile/getPortrait"
    fetch(url)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((myJson) => {
        console.log(myJson);
        this.setState({
          portraitImage: myJson,
          currentPortrait: myJson["happy"]
        })
      });
  }

  render() {
    return (
      <div className='portrait-container'>
        <img src={this.state.currentPortrait} className='portrait' />
      </div>
    )
  }
}
export default PillageCaptainPortrait;
