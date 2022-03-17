import React from 'react';
import { track } from '../types';
import RecentTracks from './RecentTracks';
import TopTracks from './TopTracks';
import "../styles/topAndRecent.css"

interface AppProps {
    accessToken: string |null
    trackData: track[]
}

const TopAndRecent = ({accessToken, trackData}:AppProps) => {
    return (
        <div className='main'>
            <TopTracks />
            <RecentTracks accessToken={accessToken} />
        </div>
    );
}

export default TopAndRecent;
