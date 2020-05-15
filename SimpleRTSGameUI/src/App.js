import React from 'react';
import './App.css';
import Footer from './Components/GameFooter/Footer';
import Map from './Components/GameMap/Map';
import Game from './Game/Game';


function App() {
  return (
    <div className="App">
      <Map/>
      <Footer/>
    </div>
  );
}

export default App;
