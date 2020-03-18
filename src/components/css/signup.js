import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'



import './css/style.css'
import image2 from './images/signup-image.jpg'
import axios from 'axios'

function Signin() {
    const [state, setState] = useState(false)
    const [wrongCredential, setWrongCredential] = useState(false)


    let registerHandler = (e) => {
        e.preventDefault();

        let email = e.target.email.value
        let pass = e.target.pass.value
        let name = e.target.name.value

        axios.post("http://localhost:5000/api/auth/register", {
            email,
            pass,
            name
        })
            .then((response) => {
                console.log(response.data.status);
                if (response.data.status === "success") {
                    setState(true)
                } else {
                    setWrongCredential(true)
                }
            })
            .catch((error) => {
                console.log(error);

            })
        console.log({ email, pass });
    }

    if (state === true) {
        return <Redirect to="/login" />


    } else {
        return (

            <div className="container">
                <div className="signup-content">
                    <div className="signup-form">
                        <h2 className="form-title">Sign up</h2>
                        <form onSubmit={registerHandler} className="register-form" id="register-form">
                            <div className="form-group">
                                <label for="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="name" id="name" placeholder="Your Name" />
                            </div>
                            <div className="form-group">
                                <label for="email"><i className="zmdi zmdi-email"></i></label>
                                <input type="email" name="email" id="email" placeholder="Your Email" />
                                {wrongCredential ? <small style={{ color: "red" }}>this email is token</small> : null}
                            </div>

                            <div className="form-group">
                                <label for="pass"><i className="zmdi zmdi-lock"></i></label>
                                <input type="password" name="pass" id="pass" placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <label for="re-pass"><i className="zmdi zmdi-lock-outline"></i></label>
                                <input type="password" name="re_pass" id="re_pass" placeholder="Repeat your password" />
                            </div>
                            <div className="form-group">
                                <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                                <label for="agree-term" className="label-agree-term"><span><span></span></span>I agree all statements in  <a href="/" className="term-service">Terms of service</a></label>
                            </div>
                            <div className="form-group form-button">
                                <input type="submit" name="signup" id="signup" className="form-submit" value="Register" />
                            </div>
                        </form>
                    </div>
                    <div className="signup-image">
                        <figure><img src={image2} alt="sing up image" /></figure>
                        <Link className="signup-image-link" to="login">
                            I am already member
                        </Link>
                    </div>
                </div>

            </div>

        );
    }

}

export default Signin;