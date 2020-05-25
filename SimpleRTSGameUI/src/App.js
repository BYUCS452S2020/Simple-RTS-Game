import React from 'react';
import './App.css';
import Footer from './Components/GameFooter/Footer';
import Map from './Components/GameMap/Map'
import Header from './Components/Header/Header';
import RegistrationForm from './Components/RegistrationForm/RegistrationForm';
import Login from './Components/Login/Login'
import Home from './Components/Home/Home';
import PrivateRoute from './PrivateRoute';
import history from './history';
import SuccessModal from './Components/Modals/Success';
import ErrorModal from './Components/Modals/Error';
import Profile from './Components/Profile/Profile'

import {
  Router,
  Switch,
  Route
} from "react-router-dom";

function App() {

  return (
    <Router history={history}>
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

            <PrivateRoute path="/home" exact={true}>
              <Header/>
              <Home/>
            </PrivateRoute>

            <PrivateRoute path="/game" exact={true}>
              <Map/>
              <Footer/>
            </PrivateRoute>

            <PrivateRoute path="/profile" exact={true}>
              <Header/>
              <Profile/>
            </PrivateRoute>
          </Switch>

        <SuccessModal />
        <ErrorModal />

   </div>
  </Router>
  );
}

export default App;
