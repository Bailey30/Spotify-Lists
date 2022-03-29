import React, { useEffect, Suspense} from 'react';

import gsap from "gsap";
import "../styles/global.css"
import "../styles/login.css"

import { Canvas } from "@react-three/fiber"
import { Html } from "@react-three/drei"


const LOGIN_URI: string =
  process.env.NODE_ENV !== 'production'
    // ? 'http://localhost:3000/login'
    ? 'http://localhost:4000/login'
    : 'https://spotify-lists.herokuapp.com/login';


const HTMLContent = () => {

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
      opacity: 1
    })

  }, [])

  return (
    <group>
      <Html center>
        {/* <div className="background">
      </div> */}
        <div className="title">
          <div className="wordContainer">
            <div className="spotify word" >SPOTIFY</div>
          </div>
          <div className="wordContainer">
            <div className="lists word" >LISTS</div>
          </div>
          <div className="wordContainer">
            <div className='explanation'>Quickly generate lists of recommended tracks based on your listening history and top artists</div>
          </div>
          <div className="wordContainer">
            <a href={LOGIN_URI} className="link">Login to Spotify</a>
          </div>
        </div>
      </Html>
    </group>


  )
}

const Login = () => {
  // user clicks login and app redirect to spotify authorization page (routes in server index.ts) 
  // app then redirects to /callback with access and refresh codes in url


  return (
    <div className='page'>
      <Canvas>
        <ambientLight />
        <color attach="background" args={["black"]} />
        <Suspense fallback={null}>
          <HTMLContent />
        </Suspense>
      </Canvas>
    </div>
    // </div>
  )
}

export default Login