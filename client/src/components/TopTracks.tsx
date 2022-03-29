import React, { useState, useEffect, useContext } from 'react';
import { getTopTracksLong, getTopTracksMedium, getTopTracksShort } from '../spotify';
import { track } from "../types"
import { getURIs, pushSelectedInfo } from '../utils';
import List from './List';
import { StoreContext } from './store';
import "../styles/topAndRecent.css"

export default function TopTracks() {

    const [topTracks, setTopTracks] = useState<track[]>([])
    const [range, setRange] = useState<string>()
    const ranges = ["All time", "Last 6 months", "Last 4 weeks"]
    const [value, setValue] = useState<number>()

    const { playingTrack, setPlayingTrack, playArray, setPlayArray, trackName, setTrackName } = useContext(StoreContext)

    const getTracks = async () => {
        const data = await getTopTracksLong()
        const allTracks = pushSelectedInfo(data.data.items)
        setTopTracks(allTracks)
    }

    useEffect(() => {
        getTracks()
        setValue(0)
    }, [])


    useEffect(() => {
        async function callAPI(range: string,) {
            let data
            if (range === ranges[0]) {
                data = await getTopTracksLong()
                setValue(0)
            } else if (range === ranges[1]) {
                data = await getTopTracksMedium()
                setValue(1)
            } else if (range === ranges[2]) {
                data = await getTopTracksShort()
                setValue(2)
            }
            const allTracks = pushSelectedInfo(data?.data.items)
            setTopTracks(allTracks)
        }
        callAPI(range!)

    }, [range])

    // when choosing a song - send whole list to player
    const handlePlayer = (i: number) => {
        setPlayingTrack(i)
        const uris = getURIs(topTracks)
        setPlayArray(uris)
        setTrackName(topTracks[i].name)
    }

    return (
        <div className='body'>
            <div className="main" >
                <List tracks={topTracks} title={"your most played tracks"} handlePlayer={handlePlayer} setRange={setRange} value={value} />
            </div>
        </div>
    );
}
