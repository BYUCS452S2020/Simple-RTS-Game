import React from 'react';
import './App.css';
// import Footer from './Components/GameFooter/Footer';
// import Map from './Components/GameMap/Map';
import MapRenderer from './Components/GameMap/MapRenderer';


function App() {
  return (
    <div className="App">
      {/*<Map/>
      <Footer/>*/}
      <MapRenderer map="Level1" />
    </div>
  );
}

export default App;
