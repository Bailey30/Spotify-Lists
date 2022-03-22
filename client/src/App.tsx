import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom"
import React, { useEffect, useState, useMemo } from "react"
import './App.css';
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"

import { token, GetAccessToken } from "./spotify"
import { createContext, useContext } from "react";

const App = () => {
  const [access_Token, setAccess_Token] = useState<string | null>() 

  // on page load check for token - should be token
  useEffect(() => {
    console.log("access token attempt from app.tsx");
    setAccess_Token(GetAccessToken)
  }, [])    

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
