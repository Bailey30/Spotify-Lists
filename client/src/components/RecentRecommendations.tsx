
import React, { useState, useEffect, useContext } from 'react';
import "../styles/recentRecommendations.css"
import { StoreContext } from './store';
import { recentArtistRecommendations, recentTrackRecommendation } from '../spotify';
import { track } from '../types';
import { getTracks, getTrackURIs, getURIs, pushSelectedInfo } from '../utils';
import List from './List';
import { RecentTracksContext } from './recentTracksContext';


const RecentRecommendations = () => {
    const { recentTracks, setRecentTracks } = useContext(RecentTracksContext)
    const { playingTrack, setPlayingTrack, playArray, setPlayArray, trackName, setTrackName } = useContext(StoreContext)
    const [recentArtistURIs, setRecentArtistURIs] = useState<string[]>([])
    const [recommendedArtistTracks, setRecommendedArtistTracks] = useState<track[]>([])
    const [recommendedTrackTracks, setRecommendedTrackTracks] = useState<track[]>([])

    useEffect(() => {
        const trackData = async () => {
            const tracks = await getTracks()
            setRecentTracks(tracks!)
        }
        trackData()
    }, [])

    // take artist URis from recent songs list
    useEffect(() => {
        if (recentTracks) {
            const URIarray: string[] = []
            recentTracks && recentTracks.forEach((track: track) => {
                URIarray.push(track.artistURI)
            });
            setRecentArtistURIs(URIarray)
        }
    }, [recentTracks])

    // where recent artist uris have been obtained use them to get recommendations
    useEffect(() => {
        getRecentArtistRecommendations()
        getRecentTrackRecommendations()
    }, [recentArtistURIs])


    // gather unique URI's and obtain just the numbers
    // then push fetched data to recommended tracks array
    const getRecentArtistRecommendations = async () => {
        const uniqueURIs: string[] = [...new Set(recentArtistURIs)]
        const URInums = uniqueURIs.map((item) => item.replace("spotify:artist:", ""))
        const data = await recentArtistRecommendations(URInums)
        const allTracks = pushSelectedInfo(data.data.tracks)
        setRecommendedArtistTracks(allTracks)
    }

    const getRecentTrackRecommendations = async () => {
        const trackURIs = getTrackURIs(recentTracks)
        const uniqueURIs: string[] = [...new Set(trackURIs)]
        const URInums = uniqueURIs.map((item) => item.replace("spotify:track:", ""))
        const data = await recentTrackRecommendation(URInums)
        if (data) {
            const allTracks = pushSelectedInfo(data.data.tracks)
            setRecommendedTrackTracks(allTracks)
        }
    }

    // when choosing a song - send whole list to player
    const handlePlayer = (i: number, tracks: track[]) => {
        setPlayingTrack(i)
        const uris = getURIs(tracks)
        setPlayArray(uris)
        setTrackName(tracks[i].name)
    }


    return (
        <div className="main">

            {recommendedArtistTracks && <List tracks={recommendedArtistTracks} handlePlayer={handlePlayer} title={"based on recent artists"} />}

            {recommendedTrackTracks && <List tracks={recommendedTrackTracks} handlePlayer={handlePlayer} title={"based on recent tracks"} />}
        </div>
    );
}

export default RecentRecommendations;
