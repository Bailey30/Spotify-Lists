import React, { useEffect, useState } from 'react';
import { UserData } from "../types"
import "../styles/profile.css"
import logo from "../images/Spotify_Icon_RGB_Green.png"
import {AiOutlineMenu} from "react-icons/ai"

interface AppProps {
    user?: UserData
    setShowNav: React.Dispatch<React.SetStateAction<boolean>>
    showNav: boolean
}

const Profile = ({ user, setShowNav, showNav }: AppProps) => {
    const [show, setShow] = useState<boolean>(true)
    const [lastScroll , setLastScroll]= useState<number|null>()

    // let lastScroll = 0
    window.addEventListener("scroll", ()=> {
        let currentScroll = window.scrollY;
        // if ( currentScroll <=0){
        //     setShow(true)
        //     return
        // }
        if (currentScroll > lastScroll!){
            setShow(false)
        } else if (currentScroll< lastScroll!) {
            setShow(true)

        }
        setLastScroll(currentScroll)

    })
    useEffect(()=> {
        console.log(showNav);
      },[showNav])

      const handleNav = ()=> {
          console.log("nav");
        setShowNav(!showNav)
      }

    return (
        <div className='header' style={{opacity: show? 1 : 0}}>
            <div className="menuButton" onClick={handleNav}><AiOutlineMenu/></div>
            <div className="nameAndIcon">
                <div className='userName'>{user?.name}</div>
                <div className='iconCont'>
                    <a href={`https://open.spotify.com/user/${user?.name}`}>
                    <img src={logo} alt="green spotify icon" className='icon' />
                    </a>
                </div>
            </div>
        </div>

    );
}
export default Profile
