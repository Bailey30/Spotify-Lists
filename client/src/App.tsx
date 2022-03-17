import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom"
import React, { useEffect, useState, useMemo } from "react"
import './App.css';
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"

import { token } from "./spotify"
import { createContext, useContext } from "react";
import { AccessTokenContext } from "./AccessTokenContext";




const App = () => {
  const access_token = useContext(AccessTokenContext)
  const [access_Token, setAccess_Token] = useState<string | null>()

  // on page load check for token - should be token
  useEffect(() => {
    setAccess_Token(token)
  }, [])    

  console.log("accessToken from app.tsx: ", access_Token);
  console.log(typeof access_Token);

  return (
    <div className="App">
      {typeof access_Token ===  "string" ? <Dashboard /> : <Login />}
      {/* <Login/> */}
    </div>

  );
}

export default App;

//click log in to get access token
//if access token => navigate to main page
//store access token in state
