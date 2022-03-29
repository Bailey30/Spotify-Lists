import { access } from 'fs';
import React, { useState, useEffect, useContext } from 'react';
import { GetAccessToken, getRecentlyPlayed } from '../spotify';
import { track } from '../types';
import { StoreContext } from './store';
import { formatDuration, getTracks, getURIs } from '../utils';
import List from './List';
import "../styles/topAndRecent.css"
import axios from 'axios';
import { RecentTracksContext } from './recentTracksContext';

//make a seperate recent tracks context - pass to only relevant components - try to memoize to prevent rerenders


const RecentTracks = () => {
    const { recentTracks, setRecentTracks } = useContext(RecentTracksContext)
    const { playingTrack, setPlayingTrack, playArray, setPlayArray, trackName, setTrackName } = useContext(StoreContext)


    useEffect(() => {
        trackData()
    }, [])

    const trackData = async () => {
        const tracks = await getTracks()
        setRecentTracks(tracks!)
    }

    const handlePlayer = (i: number) => {
        setPlayingTrack(i)
        const uris = getURIs(recentTracks!)
        setPlayArray(uris)
        // console.log(uris);
        console.log(playArray);
        setTrackName(recentTracks![i].name)
    }

    return (
        <div className='main'>
            {recentTracks &&
                <List tracks={recentTracks} title={"recently played tracks"} handlePlayer={handlePlayer} />
            }
        </div>

    );
}

export default RecentTracks;
