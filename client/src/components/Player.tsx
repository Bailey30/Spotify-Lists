import React, { useState, useEffect, useContext } from 'react'
import "../styles/player.css"
import "../styles/global.css"
import SpotifyPlayer from 'react-spotify-web-playback';
import { getDevice } from "../spotify"
import { StoreContext } from './store';

interface AppProps {
    accessToken: string
}

export const Player = ({ accessToken }: AppProps) => {
    const [play, setPlay] = useState<boolean>(false)
    const [device, setDevice] = useState<any>()

    const { playingTrack, setPlayingTrack, playArray, setPlayArray, setRecentTracks, recentTracks, trackName, setTrackName } = useContext(StoreContext)

    const getDeviceData = async () => {
        console.log("deviceDataAttempt");
        const data = await getDevice()
        setDevice(data)
    }

    useEffect(() => {
        getDeviceData()
    }, [])

    useEffect(() => {
        console.log(device);
    }, [device])

    useEffect(() => {
        setPlay(true);
    }, [playingTrack]);
    if (!accessToken) return null
    return (<div>
        <div className="player">
            <SpotifyPlayer
                persistDeviceSelection
                token={accessToken}
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
