import React, { useState, useEffect, useContext } from 'react'
import "../styles/player.css"
import "../styles/global.css"
import SpotifyPlayer from 'react-spotify-web-playback';
import { getDevice, token } from "../spotify"
import { StoreContext } from './store';





export const Player = () => {
    const [play, setPlay] = useState<boolean>(false)
    const [device, setDevice] = useState<any>()
    const { playingTrack, setPlayingTrack, playArray, setPlayArray, trackName, setTrackName } = useContext(StoreContext)
    
    const getDeviceData = async () => {
        const data = await getDevice()
        setDevice(data)
    }

    useEffect(() => {
        getDeviceData()
    }, [])

    useEffect(() => {
        setPlay(true);
    }, [playingTrack]);

    if (!token) return null
    
    return (<div>
        <div className="player">
            <SpotifyPlayer
                persistDeviceSelection
                token={token}
                showSaveIcon
                callback={state => !state.isPlaying && setPlay(false)}
                play={play}
                uris={playArray}
                offset={playingTrack}
                styles={{
                    activeColor: "#fff",
                    bgColor: "black",
                    color: "#fff",
                    loaderColor: "#fff",
                    sliderColor: "#1cb954",
                    trackArtistColor: "#ccc",
                    trackNameColor: "#fff",
                    height: "65px",

                }}
            />
        </div>


    </div>
    )
}
