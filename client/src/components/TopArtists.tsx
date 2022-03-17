import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { getTopArtistsLong, headers } from '../spotify';
import { formatDuration, getURIs, pushSelectedInfo } from '../utils';
import { track } from "../types"
import { StoreContext } from './store';
import "../styles/global.css"
import "../styles/topArtists.css"
import List from './List';

const TopArtists = () => {
  const [show, setShow] = useState(false)

  const [topArtists, setTopArtists] = useState<any>()
  const [recommendedTracks, setRecommendedTracks] = useState<track[]>()

  const { playingTrack, setPlayingTrack, playArray, setPlayArray, trackName, setTrackName, recentTracks } = useContext(StoreContext)

  useEffect(() => {
    getArtists()
  }, [])

  const getArtists = async () => {
    const data = await getTopArtistsLong()
    console.log(data);
    const artists = data.data.items.map((artist: any) => ({ name: artist.name, id: artist.id }))
    console.log(artists);
    setTopArtists(artists)
    getRecommendedTracks(topArtists[0].id)
  }
  useEffect(()=> {
    if(topArtists)
    getRecommendedTracks(topArtists[0].id)

  },[topArtists])



  const getRecommendedTracks = async (id: string) => {
    const tracks = await axios.get(`https://api.spotify.com/v1/recommendations?seed_artists=${id}&limit=50`, { headers })
    console.log(tracks);
    const allTracks = pushSelectedInfo(tracks.data.tracks)
    if ( allTracks)
    setRecommendedTracks(allTracks)
  }

  const handlePlayer = (i: number) => {
    setPlayingTrack(i)
    const uris = getURIs(recommendedTracks!)
    setPlayArray(uris)
    console.log(recommendedTracks);
    setTrackName(recommendedTracks![i].name)
  }

  return (
    < div className='main'>
      {/* <div className='heading'>Top Artists</div> */}
      <div className="cont">
        {topArtists?.map((artist: any, i: number) => {
          return <div key={artist.id} onClick={() => getRecommendedTracks(artist.id)} className="listItem">{artist.name}</div>
        })}
      </div>

      <div className="trackList">
      {<List tracks={recommendedTracks} handlePlayer={handlePlayer} title={"tracks based on artist"}/>}
      </div>
      {/* <List tracks={recentTracks} title={"listening history"} handlePlayer={handlePlayer}/> */}
    </div>
  );
}

export default TopArtists;
