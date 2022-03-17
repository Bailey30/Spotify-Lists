import React, { useState, useEffect, useContext } from 'react';
import { getTopTracksLong, getTopTracksMedium, getTopTracksShort } from '../spotify';
import { track } from "../types"
import { formatDuration, getURIs, pushSelectedInfo } from '../utils';
import List from './List';
import { StoreContext } from './store';
import "../styles/topAndRecent.css"




export default function TopTracks() {
    const [show, setShow] = useState(false)
    const [topTracks, setTopTracks] = useState<track[]>([])
    const [range, setRange] = useState<string>()
    const ranges = ["All time", "Last 6 months", "Last 4 weeks"]
    const [value, setValue] = useState<number>()

    const { playingTrack, setPlayingTrack, playArray, setPlayArray,trackName, setTrackName } = useContext(StoreContext)

    const getTracks = async () => {
        const data = await getTopTracksLong()
        console.log(data);
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
        console.log(topTracks);
        setTrackName(topTracks[i].name)
    }

    return (
        <div className='body'>
            {/* <div className='timeRange'>
                {ranges.map((range, i)=> {
                    return <span className={`${i === value && "hover"}`}
                    onClick={()=> setRange(ranges[i])}
                    >{ranges[i]}</span>
                })}
            </div> */}
            {/* <select className="select">
                <option value="All time" className='option'>All time</option>
                <option value="Last 6 months" className='option'>Last 6 months</option>
                <option value="Last 4 weeks" className='option'>Last 4 weeks</option>
            </select> */}
        <div className="main" >
            <List tracks={topTracks} title={"your most played tracks"} handlePlayer={handlePlayer} setRange={setRange} value={value}/>
            </div>
        </div>
    );
}
