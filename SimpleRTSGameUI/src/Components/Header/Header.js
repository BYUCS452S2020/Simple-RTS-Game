import React from 'react';
import './Header.css';
import { useLocation, useHistory } from 'react-router-dom';

function Header() {
  const history = useHistory();
  const location = useLocation();

  const renderActionButton = () => {
    switch (location.pathname) {
      case '/':
        return <button className="btn btn-light" onClick={() => history.push('login')}>Login</button>
      case '/register':
        return <button className="btn btn-light" onClick={() => history.push('login')}>Login</button>
      case '/login':
        return <button className="btn btn-light" onClick={() => history.push('/register')}>Register</button>
      default:
        return <button className="btn btn-light" onClick={() => history.push('/login')}>Logout</button>

    }
  }
  return(
    <nav className="navbar navbar-dark bg-dark">
      <div className="navbar-brand">Simple RTS</div>
      {renderActionButton()}
    </nav>
  );
}

export default Header;
