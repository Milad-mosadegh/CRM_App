import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios'

import '../../App.css'
import men1 from '../../images/men1.jpeg'

const Dashboard = (props) => {
    const [state, setState] = useState('')



    axios.post("http://localhost:5000/api/dashboard",
        { headers: { "x-auth-token": localStorage.getItem('token') } })
        .then((response) => {
            console.log(response.data.status);
            if (response.data.status == "success") {
                setState(response.data.message)
            } else {
                localStorage.removeItem('token')
                return <Redirect to="/login" />
            }
        })
        .catch(function (error) {
            console.log(error);

        })

    const logout = () => {
        localStorage.removeItem("token");
        props.history.push('/signin')
    }


    const submitHandler = (e) => {
        e.preventDefault();
        console.log(e.target.name.value, e.target.email.value, e.target.phone.value, e.target.note.value);

        axios.post('http://localhost:5000/api/dashboard/newPerson',
            {
                file: e.target.file.files,
                name: e.target.name.value,
                email: e.target.email.value,
                phone: e.target.phone.value,
                note: e.target.note.value
            },
            {
                headers: {
                    "x-auth-token": localStorage.getItem('token')
                }
            }
        )
            .then((response) => {
                console.log(response);
                if (response.data.status === "Success") {

                } else {
                    localStorage.removeItem('token')
                    props.history.push('/login')
                }
            })
            .catch((error) => {
                console.log(error);
                props.history.push('/login')

            })
    }
    return (
        <div>
            {state}
            <div className="d-flex">

                <div className="col-md-4 col-sm-12 vh-100">
                    <form style={{ marginTop: "300px" }} onSubmit={submitHandler} >
                        <div className="form-group">
                            <p>Import Picture</p>
                            <input name="file" type="file" className="form-control-file " id="exampleFormControlFile1" />
                        </div>
                        <p>Write Your Name</p>
                        <input name="name" type="text" className="form-control mb-3" placeholder="Name and last Name" />
                        <p>Write Your E-Mail</p>
                        <input name="email" type="email" className="form-control mb-3" placeholder="Email" />
                        <p>Write Your Phone Number</p>
                        <input name="phone" type="number" className="form-control mb-3" placeholder="Phone Number" />
                        <p>Write Your Note's</p>
                        <textarea name="note" type="text" className="form-control mb-3" placeholder="Notes" />

                        <button className="btn btn-outline-primary mb-3 btn-block"  >Add</button>
                    </form>
                </div>

                {/*  */}
                <div id="cardPlace" className="col-md-8 col-sm-12 bg-secondary vh-100">
                    <div className="float-right">
                        <button onClick={logout} className="btn btn-primary ">Logout</button>
                    </div>

                    <div className="card" style={{ width: "18rem" }}>

                        <img src={men1} className="card-img-top" alt="..." />
                        <div className="card-body text-center">
                            <h5 className="card-title">Milad Mosadegh</h5>
                            <hr />
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <hr />
                            <button className="btn btn-danger m-2">Delete</button>
                            <button className="btn btn-success m-2">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}




export default Dashboard;