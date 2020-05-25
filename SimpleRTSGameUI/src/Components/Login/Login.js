import React, {useState} from 'react';
// import axios from 'axios';
// import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions';
import './Login.css';

function Login(props) {
    const [state , setState] = useState({
        username : "",
        password : "",
        toGame   : false
    })
    const handleChange = (e) => {
        const {id , value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        sendDetailsToServer()
    }
    const sendDetailsToServer = () => {
        if(state.username.length && state.password.length) {
            props.login(state.username, state.password);
        } else {
            // props.showError('Please enter valid username and password')
        }

    }
    // const history = useHistory();

    // const redirectToHome = () => {
    //     history.push("/home");
    // }
    return(
        <div className='login-container'>
<           div className="card col-12 col-lg-4 login-card mt-2 hv-center">
                <form>
                    <div className="form-group text-left">
                    <label htmlFor="usernameInput">Username</label>
                    <input type="username"
                        className="form-control"
                        id="username"
                        placeholder="Enter username"
                        value={state.username}
                        onChange={handleChange}
                    />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            value={state.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleSubmitClick}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>

    )
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => { dispatch(login(username, password)) }
  }
}
export default connect(null, mapDispatchToProps)(Login);
