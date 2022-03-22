import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { AiOutlineClose } from "react-icons/ai"

import "../styles/nav.css"
import "../styles/global.css"

interface AppProps {
    showNav: boolean
    setShowNav: React.Dispatch<React.SetStateAction<boolean>>
}

export const Nav = ({ showNav, setShowNav }: AppProps) => {
    const mediaMatch = window.matchMedia("(max-width: 768px)")
    const [matches, setMatches] = useState(mediaMatch.matches);
    useEffect(() => {
        const handler = (e: { matches: boolean | ((prevState: boolean) => boolean) }) => setMatches(e.matches);
        mediaMatch.addListener(handler);

        return () => mediaMatch.removeListener(handler);
      });
      useEffect(()=> {

      },[matches])

    const styles: any = {
        transform: `translate(0px, 0px)`,
    };

    return (
        <div>
            <div className='nav' style={showNav ? styles : null}>
                <div className="links">
                    {matches && <div className="closeIconCont">
                        <span onClick={() => setShowNav(!showNav)} className="close"><AiOutlineClose /></span>
                    </div>}
                    <div className='navHeader'>LISTS</div>
                    <Link to="/" className='navItem'>Recent tracks and artists</Link>
                    <Link to="/topArtists" className='navItem'>Your top artists</Link>
                    <hr className='horizontalRule'></hr>
                    <div className="navHeader">YOUR ACCOUNT</div>
                    <Link to="/topTracks" className='navItem'>Top tracks</Link>
                    <Link to="/recentTracks" className='navItem'>Listening history</Link>
                </div>
            </div>
        </div>
    )
}
