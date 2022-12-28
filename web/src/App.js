// import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useContext } from "react";
import { GlobalContext } from './context/Context';

import Home from "./components/Home/Index";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";

export default function App(props) {

  // const [state.isLogin, setstate.IsLogin] = useState(false);

  let { state, dispatch } = useContext(GlobalContext);
  

  return (
    <div className="App">
      {state.isLogin ? (
        <Routes>
        
          <Route path="/" element={<Home/>} />  

          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="*" element={<Navigate to="/login" replace={true} />} />
        </Routes>
      )}
    </div>
  );
}