// import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState} from "react";
import Home from "./components/Home/Index";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";

export default function App(props) {

  const [isLogin, setIsLogin] = useState(false);

  

  return (
    <div className="App">
      {isLogin ? (
        <Routes>
        
          <Route path="/" element={<Home/>} />  

          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="*" element={<Navigate to="/login" replace={true} />} />
        </Routes>
      )}
    </div>
  );
}