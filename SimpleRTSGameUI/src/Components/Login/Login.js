import React, {useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
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
            // props.showError(null);
            const payload={
                "username":state.username,
                "password":state.password,
            }
            axios.post("http://localhost:4000/"+'login', payload)
                .then(function (response) {
                    if(response.data.code === 200){
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'Login successful. Redirecting to game...'
                        }))
                        redirectToGame();
                        // props.showError(null)
                    } else if (response.data.message.length) {
                        console.log(response.data.message);
                        redirectToGame();
                    } else{
                        console.log("Some error ocurred");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });    
        } else {
            // props.showError('Please enter valid username and password')    
        }
        
    }
    const history = useHistory();

    const redirectToGame = () => {
        history.push("/game");
    }
    const redirectToRegister = () => {
        history.push("/register");
    }
    return(
        <div class='login-container'>
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
                    <button 
                        type="link" 
                        className="register-button btn btn-secondary"
                        onClick={redirectToRegister}
                    >
                        Register Instead
                    </button>
                </form>
            </div>
        </div>
        
    )
}
export default Login