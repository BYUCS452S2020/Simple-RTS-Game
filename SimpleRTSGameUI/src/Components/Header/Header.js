import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions';
import './Header.css';

function Header(props) {
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
        return <button className="btn btn-light" onClick={() => props.logout()}>Logout</button>
    }
  }
  return(
    <nav className="navbar navbar-dark bg-dark">
      <div className="navbar-brand">Simple RTS</div>
      {renderActionButton()}
    </nav>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => { dispatch(logout()) }
  }
}

export default connect(null, mapDispatchToProps)(Header);
