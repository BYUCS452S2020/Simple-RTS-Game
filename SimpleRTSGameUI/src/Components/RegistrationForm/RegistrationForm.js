import React, {useState} from 'react';
// import axios from 'axios';
// import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../actions';
import './RegistrationForm.css'

function RegistrationForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        username: "",
        firstName: "",
        lastName: ""
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
        if(state.password === state.confirmPassword) {
            sendDetailsToServer()
        } else {
            // props.showError('Passwords do not match');
        }
    }
    const sendDetailsToServer = () => {
        if(state.email.length && state.password.length && state.username.length) {
            // props.showError(null);
            const payload={
                "email":state.email,
                "password":state.password,
                "username":state.username,
                "firstName":state.firstName,
                "lastName":state.lastName
            }
            console.log(payload);
            props.register(payload);
        } else {
            // props.showError('Please enter valid username and password')
        }

    }

    // const history = useHistory();

    // const redirectToHome = () => {
    //     history.push("/home");
    // }

    return(
        <div className='registration-container'>
            <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                <label htmlFor="inputEmail">Email address</label>
                <input type="email"
                       className="form-control"
                       id="email"
                       aria-describedby="emailHelp"
                       placeholder="Enter email"
                       value={state.email}
                       onChange={handleChange}
                />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="inputPassword">Password</label>
                    <input type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="inputPassword">Confirm Password</label>
                    <input type="password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        value={state.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="inputUsername">Username</label>
                    <input type="username"
                        className="form-control"
                        id="username"
                        placeholder="Enter username"
                        value={state.username}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group text-left">
                    <label htmlFor="inputFirstName">First Name</label>
                    <input type="firstName"
                        className="form-control"
                        id="firstName"
                        placeholder="Enter first name"
                        value={state.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="inputLastName">Last Name</label>
                    <input type="lastName"
                        className="form-control"
                        id="lastName"
                        placeholder="Enter last name"
                        value={state.lastName}
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Register
                </button>
            </form>
        </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (user) => { dispatch(register(user)) }
  }
}
export default connect(null, mapDispatchToProps)(RegistrationForm)
