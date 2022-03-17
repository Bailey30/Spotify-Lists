import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { AccessTokenContext } from '../AccessTokenContext';
import { token } from '../spotify';
import gsap from "gsap";
import "../styles/global.css"
import "../styles/login.css"

const LOGIN_URI: string = "http://localhost:3000/login"

type Props = {
  // setLogin: React.Dispatch<React.SetStateAction<boolean>>
  // setLogin: any
  // login: boolean
}

const Login = () => {


  // user clicks login and app redirect to spotify authorization page (routes in server index.ts) 
  // app then redirects to /callback with access and refresh codes in url
  useEffect(() => {
    gsap.to(".background", {
      y: 0,
      duration: 0.5
    })
    gsap.to(".spotify", {
      y: 0,
      duration: 0.5,
      delay: 0.5
    })
    gsap.to(".lists", {
      y: 0,
      delay: 0.6,
    })
    gsap.to(".explanation", {
      y: 0,
      delay: 0.8
    })
    gsap.to(".link", {
      y: 0,
      delay: 1.5,
      opacity:1 
    })

  }, [])



  return (
    <div className='page'>
      <div className="background">
      </div>
      <div className="title">
        <div className="wordContainer">
          <div className="spotify word" >SPOTIFY</div>

        </div>
        {/* <div className="wordContainer">
      <div className="quick word" >QUICK</div>
      
    </div> */}
        <div className="wordContainer">
          <div className="lists word" >LISTS</div>

        </div>
      </div>
      <div className="wordContainer">
        <div className='explanation'>Quickly generate lists of recommended tracks based on your listening history and top artists</div>

      </div>
      <div className="wordContainer">
      <a href={LOGIN_URI} className="link">Login to Spotify</a>
      </div>
    </div>
  )
}

export default Login