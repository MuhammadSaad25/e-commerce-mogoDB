import React from 'react'
import { useState, useContext } from "react";
import { GlobalContext } from '../../context/Context';
import { Link } from "react-router-dom"

// import { Button, TextField } from '@mui/material';

import '../Login/Login.css'
import axios from "axios";


const UpdatePassword = () => {
    let { state, dispatch } = useContext(GlobalContext);

    const [result, setResult] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");

    const proceedChangePassword = async (e) => {
        e.preventDefault();

        try {
            let response = await axios.post(`${state.baseUrl}/change-password`, {
                currentPassword: currentPassword,
                password: password
            }, {
                withCredentials: true
            })

            console.log("login successful");
            setResult("password changed successfully")

            e.reset();

        } catch (e) {
            console.log("e: ", e);
        }
    }
    return (
        <>
            <h4>This is ChangePassword page</h4>

            <form onSubmit={proceedChangePassword} className="loginForm">


                <input
                    className="TextField"
                    id="currentPassword"
                    // label="Current Password"
                    // variant="outlined"
                    type="password"
                    name="current-password"
                    placeholder="Enter your current password"
                    autoComplete="current-password"
                    onChange={(e) => { setCurrentPassword(e.target.value) }}
                />


                <br />

                <input
                    className="TextField"
                    id="new-password"
                    // label="New Password"
                    // variant="outlined"
                    type="password"
                    name="new-password"
                    autoComplete="new-password"
                    placeholder="password"
                    onChange={(e) => { setPassword(e.target.value) }}
                />

                <br />

                <input
                    className="TextField"
                    id="confirm-password"
                    // label="New Password"
                    // variant="outlined"
                    type="password"
                    name="confirm-password"
                    autoComplete="new-password"
                    placeholder="password"
                    onChange={(e) => { setPassword(e.target.value) }}
                />

                <br />
                <p>{result}</p>

                <button type="submit">ChangePassword</button>

                <button>
                <Link to={"/login"}>Login
                </Link>

            </button>
            </form>
            

        </>
    )
}

export default UpdatePassword