import React, {useState} from 'react';
import './App.css';
import Footer from './Components/GameFooter/Footer';
import Map from './Components/GameMap/Map'
import Header from './Components/Header/Header';
import RegistrationForm from './Components/RegistrationForm/RegistrationForm';
import Login from './Components/Login/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {

  return (
    <Router>
      <div className="App-header">
        
          <Switch>

            <Route path="/" exact={true}>
              <Header/>
              <RegistrationForm />
            </Route>
            
            <Route path="/register" exact={true}>
              <Header/>
              <RegistrationForm />
            </Route>

            <Route path="/login" exact={true}>
              <Header/>
              <Login/>
            </Route>
         
            <Route path="/game" exact={true}>
              <Map/>
              <Footer/>
            </Route>

          </Switch>

   </div>
  </Router>
  );
}

export default App;
