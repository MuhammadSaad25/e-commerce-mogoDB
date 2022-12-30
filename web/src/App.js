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

  // const [fullName, setFullName] = useState("");

 

  useEffect(() => {
    const getProfile = async () => {
      try {
        let response = await axios.get(`${state.baseUrl}/products`, {
          withCredentials: true,
        });

        console.log("response: ", response);

        dispatch({
          type: "USER_LOGIN",
        });
      } catch (error) {
        console.log("axios error: ", error);

        dispatch({
          type: "USER_LOGOUT",
        });
      }
    };
    getProfile();
  }, []);

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
