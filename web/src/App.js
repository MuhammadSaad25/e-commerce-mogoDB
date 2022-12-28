// import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "./context/Context";

import Home from "./components/Home/Index";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import axios from "axios";

export default function App(props) {
  // const [state.isLogin, setstate.IsLogin] = useState(false);

  let { state, dispatch } = useContext(GlobalContext);

  const logoutHandler = () => {
    
  };

  useEffect(() => {
    let baseURI = "";
    if (window.location.href.split(":")[0] === "http") {
      baseURI = `http://localhost:5001`;
    } else {
      baseURI = `https://e-commerce-mongodb-saad.cyclic.app`;
    }

    const getProfile = async () => {
      let response = await axios.post(`${baseURI}/api/v1/products `, {
        withCredentials: true,
      });
      dispatch({
        type:'USER_LOGIN'
      })
    };
    getProfile()

  },[]);

  return (
    <div className="App"> 
      {state.isLogin ? (
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      )}
    </div>
  );
}
