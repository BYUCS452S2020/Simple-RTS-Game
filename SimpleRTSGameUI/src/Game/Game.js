import React from 'react';
import GameLoader from './GameLoader';
import './Game.css';

class Game extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to Level 1</h1>
        <GameLoader />
      </div>
    );
  }
}

export default Game;
