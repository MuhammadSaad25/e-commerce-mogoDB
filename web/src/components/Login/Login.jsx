import { useFormik } from "formik";
import * as yup from "yup";
import "./Login.css";

import { useState, useContext } from "react";
import { GlobalContext } from '../../context/Context';
import axios from "axios";





// let baseURI = "";
// if (window.location.href.split(":")[0] === "http") {
//     baseURI = `http://localhost:5001`;
// } else {
//     baseURI = `https://e-commerce-mongodb-saad.cyclic.app`;
// }



const Login = () => {

    let { state, dispatch } = useContext(GlobalContext);


    const fmrk = useFormik({
        initialValues: {
            email: "",
            password: "",
        },

        validationSchema: yup.object({
            email: yup
                .string("Enter your email")
                .email("Enter your email")
                .required("Email is required")
                .min(1)
                .max(25, "Please enter within 25 characters"),
            password: yup
                .string("Enter your Password")
                .required("Password is required")
                .min(6, "Please enter more then 6 characters ")
                .max(65, "Please enter within 65 characters "),
        }),

        onSubmit: async (values) => {
            console.log(values);
            try {
                const res = await axios.post(
                    `${state.baseURI}/login`,
                    {
                        email: values.email,
                        password: values.password,
                    },
                    // { withCredentials: true }//we are not sending cookies
                );
                dispatch({
                    type:'USER_LOGIN',
                    payload:null
                })
                console.log("Login successful", res);
                //   toast(`${res.data.message}`); //https://www.npmjs.com/package/react-toastify
            } catch (err) {
                console.log(err);
                console.log(err.response.data.message);
                //   toast(`${err.response.data.message}`);
            }
            //do something like there you can call API or send data to firebase
            //if (errors) console.log("error is", errors);
            //console.log(errors);
        },
        //if (errors) console.log("error is", errors);

    });

    return (
        <div>
            {/* {state.text} */}
            <form onSubmit={fmrk.handleSubmit}>
                <div className="segment">
                    <h1>Login</h1>
                    {/* <button className="unit" type="button">
                        <i className="icon ion-md-bookmark"></i>
                    </button> */}
                </div>

                <div className="content1">

                    <label className=".label">
                        <input
                            className="input"
                            id="email"
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={fmrk.values.email}
                            onChange={fmrk.handleChange}
                            onBlur={fmrk.handleBlur}
                        />
                    </label>
                    {fmrk.touched.email && Boolean(fmrk.errors.email) ? (
                        <p className="errorSpan">{fmrk.errors.email}</p>
                    ) : null}

                    <label className=".label">
                        <input
                            id="userPassword"
                            className="input"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={fmrk.values.password}
                            onChange={fmrk.handleChange}
                            onBlur={fmrk.handleBlur}
                        />
                    </label>
                    {fmrk.touched.password && Boolean(fmrk.errors.password) ? (
                        <p className="errorSpan">{fmrk.errors.password}</p>
                    ) : null}
                    <br />

                </div>

                <div className="mainBtn">
                    <button className="red" type="submit">
                        <i className="icon ion-md-lock"></i> SUBMIT
                    </button>
                </div>


            </form >
        </div >
    )
}

export default Login