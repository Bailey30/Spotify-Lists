import React, {useState, useEffect} from 'react';
import { getTrackURIs, getArtistsIdsFromList, getGenresFromArtist } from '../utils';
import { getTopTracksLong , getAudioFeaturesMany, getAvailableGenreSeeds, getArtist, getArtistInfoFromIds} from '../spotify';

const GenreRecommendations = () => {

    const getTopTracksLongGenres =async ()=> {
      // const ids = getTrackIds(data.data.items)
      // const audioFeatures = await getAudioFeaturesMany(ids)   
      // console.log(data);
        // // console.log(ids.toString());  
        // // console.log(audioFeatures);
        // const seeds = await getAvailableGenreSeeds()
        // // console.log(seeds);
        
        
        const data = await getTopTracksLong()
        // console.log(data);
        const artistIds =  getArtistsIdsFromList(data.data.items)
        // console.log(artistIds);
        const artistInfo = await getArtistInfoFromIds(artistIds)
        // console.log(artistInfo);
        const topGenres = getGenresFromArtist(artistInfo.data.artists)
        // console.log(topGenres);
    }   
    useEffect(()=> {
        getTopTracksLongGenres()   
    },[])

  return (
    <div>
      
    </div>   
  );
}

export default GenreRecommendations;
