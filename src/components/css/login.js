import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom'

import axios from 'axios'

import './css/style.css'
import image1 from './images/signin-image.jpg'



function Login() {
    const [stateSignin, setSignState] = useState(false)
    const [wrongCredential, setWrongCredential] = useState(false)

    let registerHandler = (e) => {
        e.preventDefault();

        let email = e.target.email.value
        let pass = e.target.pass.value

        axios.post("http://localhost:5000/api/auth/login", {
            email,
            pass
        })
            .then((response) => {
                console.log(response);
                if (response.data.token) {
                    localStorage.setItem("token", response.data.token)
                    setSignState(true)
                } else {
                    localStorage.setItem("token", "")
                    setWrongCredential(true)
                }
            })
            .catch((error) => {
                console.log(error);

            })
        console.log({ email, pass });
    }

    if (stateSignin) {
        return <Redirect to="/dashboard" />
    }

    return (

        <div className="container">
            <div className="signin-content">
                <div className="signin-image">
                    <figure><img src={image1} alt="sing up image" /></figure>
                    <Link to="/signup" className=" signup-image-link">
                        Create an account
                                </Link>
                </div>

                <div className="signin-form">
                    <h2 className="form-title">Sign in</h2>
                    <form onSubmit={registerHandler} className="register-form" id="login-form">
                        <div className="form-group">
                            <label for="email"><i className="zmdi zmdi-account material-icons-name"></i></label>
                            <input type="email" name="email" id="your_name" placeholder="Your Name" />
                        </div>
                        <div className="form-group">
                            <label for="pass"><i className="zmdi zmdi-lock"></i></label>
                            <input type="password" name="pass" id="your_pass" placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <input type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                            <label for="remember-me" className="label-agree-term"><span><span></span></span>Remember me</label>
                        </div>
                        <div>
                            {wrongCredential ? <small style={{ color: "red" }}> E-mail or Password is wrong</small> : null}
                        </div>
                        <div className="form-group form-button">

                            <input type="submit" name="signin" id="signin" className="form-submit" value="Log in" />
                        </div>
                    </form>
                    <div className="social-login">
                        <span className="social-label">Or login with</span>
                        <ul className="socials">
                            <li><a href="/"><i className="display-flex-center zmdi zmdi-facebook"></i></a></li>
                            <li><a href="/"><i className="display-flex-center zmdi zmdi-twitter"></i></a></li>
                            <li><a href="/"><i className="display-flex-center zmdi zmdi-google"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );

}

export default Login;