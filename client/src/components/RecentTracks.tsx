import { access } from 'fs';
import React, { useState, useEffect, useContext } from 'react';
import { getRecentlyPlayed } from '../spotify';
import { track } from '../types';
import { StoreContext } from './store';
import { formatDuration, getTracks, getURIs } from '../utils';
import List from './List';
import "../styles/topAndRecent.css"

interface AppProps {
    accessToken: string | null
  
}
   
const RecentTracks = ({ accessToken }: AppProps) => {
    const [show, setShow] = useState(false)
    const {playingTrack,setPlayingTrack, playArray, setPlayArray, recentTracks,setRecentTracks, trackName, setTrackName} = useContext(StoreContext)



    useEffect(() => {
        const trackData = async()=> {
            const tracks = await getTracks(accessToken)
            setRecentTracks(tracks!)
        }
        trackData()
    }, [accessToken])

    const handlePlayer = (i: number) => {
        setPlayingTrack(i)
        const uris = getURIs(recentTracks)
        setPlayArray(uris)
        console.log(recentTracks);
        setTrackName(recentTracks[i].name)
    }

    return (
        <div className='main'>

        <List tracks={recentTracks} title={"recently played tracks"} handlePlayer={handlePlayer}/>
        </div>
        
    );
}

export default RecentTracks;
