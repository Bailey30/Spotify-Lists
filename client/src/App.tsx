import React, { useEffect, useState, useMemo } from "react"
import './App.css';
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"

import { GetAccessToken, getHashParams } from "./spotify"


const App = () => {
  // tokens are available as hash params once login is completed and url is redirected
  const { access_tokenparam, refresh_tokenparam, expires_inparam } = getHashParams()
  // then GetAccessToken is called with the hash params and sets the access_token in state
  GetAccessToken(access_tokenparam, refresh_tokenparam, expires_inparam)

  return (
    <div className="App">
      {access_tokenparam ? <Dashboard access_tokenparam={access_tokenparam} /> : <Login />}
    </div>
  );
}

export default App;

//click log in to get access token
//if access token => navigate to main page
//store access token in state
