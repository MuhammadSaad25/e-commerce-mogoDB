import { useFormik } from "formik";
import * as yup from "yup";
import "./SignUp.css";
import { useState, useContext } from "react";
import { GlobalContext } from '../../context/Context';
import axios from "axios";





// let baseURI = "";
// if (window.location.href.split(":")[0] === "http") {
//   baseURI = `http://localhost:5001`;
// } else {
//   baseURI = `https://e-commerce-mongodb-saad.cyclic.app`;
// }



function Signup() {
    let { state, dispatch } = useContext(GlobalContext);

    const fmrk = useFormik({
        initialValues: {
            email: "",
            firstName: "",
            lastName: "",
            password: "",
        },

        validationSchema: yup.object({
            email: yup
                .string("Enter your email")
                .email("Enter your email")
                .required("Email is required")
                .min(1)
                .max(25, "Please enter within 25 characters"),
            firstName: yup
                .string("Enter your name")
                .required("First Name is required")
                .min(4, "Please enter more then 4 characters ")
                .max(15, "Please enter within 15 characters "),
            lastName: yup
                .string("Enter your name")
                .required("Last name is required")
                .min(4, "Please enter more then 4 characters ")
                .max(15, "Please enter within 15 characters "),
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
                `${state.baseURI}/signup`,
                {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    password: values.password,
                },
                // { withCredentials: true }//we are not sending cookies
              );
              console.log("Signup successful",res);
            //   toast(`${res.data.message}`); //https://www.npmjs.com/package/react-toastify
            } catch (err) {
              console.log(err);
              console.log(err.response.data.message);
            //   toast(`${err.response.data.message}`);
            }
            //do something like there you can call API or send data to firebase
            //if (errors) console.log("error is", errors);
            //console.log(errors);
          }
           
        ,
    });

    return (
        <div>
            <form onSubmit={fmrk.handleSubmit}>
                <div className="segment">
                    <h1>Sign up</h1>
                    {/* <button className="unit" type="button">
                        <i className="icon ion-md-bookmark"></i>
                    </button> */}
                </div>

                <div className="content">
                    <div className="left">
                        <label>
                            <input
                                className="input"
                                type="firstName"
                                autoComplete="off"
                                id="firstName"
                                placeholder="First Name"
                                name="firstName"
                                value={fmrk.values.firstName}
                                onChange={fmrk.handleChange}
                                onBlur={fmrk.handleBlur}
                            />
                        </label>
                        {fmrk.touched.firstName && Boolean(fmrk.errors.firstName) ? (
                            <p className="errorSpan">{fmrk.errors.firstName}</p>
                        ) : null}

                        <label>
                            <input
                                className="input"
                                type="lastName"
                                autoComplete="off"
                                id="lastName"
                                placeholder="Last Name"
                                name="lastName"
                                value={fmrk.values.lastName}
                                onChange={fmrk.handleChange}
                                onBlur={fmrk.handleBlur}
                            />
                        </label>
                        {fmrk.touched.lastName && Boolean(fmrk.errors.lastName) ? (
                            <p className="errorSpan">{fmrk.errors.lastName}</p>
                        ) : null}

                    </div>

                    <div className="right">
                        <label>
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

                        <label>
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
                    </div>
                </div>

                <div className="mainBtn">
                    <button className="red" type="submit">
                        <i className="icon ion-md-lock"></i> SUBMIT
                    </button>
                </div>

            </form >
        </div >
    );
}

export default Signup;