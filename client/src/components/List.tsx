import React, { useState, useContext } from 'react';
import { BsFillPlayFill } from "react-icons/bs"
import "../styles/list.css"
import { track } from '../types';
import { formatDuration } from '../utils';
import { StoreContext } from './store';



const List = (props: any) => {
  const [show, setShow] = useState(false)
  const { playingTrack, setPlayingTrack, playArray, setPlayArray, recentTracks, setRecentTracks, trackName, setTrackName } = useContext(StoreContext)
  // console.log(props);
  const [hover, setHover] = useState<number | null>()
  const ranges = ["All time", "Last 6 months", "Last 4 weeks"]
  console.log(props.value);
  return (
    <div className="tracksColumn">
      <div className="headingCont">
        <div className="listHeading">{props.title}</div>
        {props.setRange ? 
          <div className='timeRange'>
            {ranges.map((range, i) => {
              return <span className={`${i === props.value && "hover"}`} style={{marginLeft:"20px"}}
                onClick={() => props.setRange(ranges[i])}
              >{ranges[i]}</span>
            })}
          </div>
          : null}
      </div>
      {props.tracks && props.tracks.slice(0, show ? 50 : 9).map((song: track, i: number) => {
        return <div
          key={i}
          className="tracksRow"
          onClick={() => props.handlePlayer(i, props.tracks)}
          onMouseOver={() => setHover(i)}
          onMouseLeave={() => setHover(null)}
        >
          <img src={song.image} alt="album art" />
          {/* {(trackName === props.tracks[i].name || hover) && <span className='playIcon'><BsFillPlayFill/></span>} */}
          <span className='playIcon'
            style={{ opacity: (trackName === props.tracks[i].name || hover === i) ? "1" : "0" }}><BsFillPlayFill /></span>
          <div className='nameAndArtist'>
            <span className='songName'>{song.name}</span>
            <span className="songArtist">{song.artist}</span>
          </div>
          <span className='songDuration'>{formatDuration(song.duration)}</span>
        </div>
      })}
      <span onClick={() => setShow(!show)} className="showMore">Show {show ? "less" : "more"}</span>
    </div>
  );
}

export default List;
