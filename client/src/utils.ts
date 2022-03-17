import TopTracks from "./components/TopTracks";
import { getRecentlyPlayed } from "./spotify";
import { track } from "./types";




export const getTracks = async (accessToken: string | null) => {
    try {
        const data = await getRecentlyPlayed(accessToken)
        // console.log(data);
        const allTracks: track[] = []
        data!.data.items.map(function (item: any, i: number) {
            // artist, album, name, preview_url, url, image
            allTracks.push({
                artist: item.track.artists[0].name,
                album: item.track.album.name,
                name: item.track.name,
                preview_url: item.track.preview_url,
                uri: item.track.uri,
                image: item.track.album.images[2].url,
                duration: item.track.duration_ms,
                artistURI: item.track.artists[0].uri
            })
            return null
        })
        return allTracks

    } catch (error) {
        console.log(error);
    }
}



export const pushSelectedInfo = (data: any) => {
    const allTracks: track[] = []
    data.map(function (item: any, i: number) {
        // artist, album, name, preview_url, url, image
        allTracks.push({
            artist: item.artists[0].name,
            album: item.album.name,
            name: item.name,
            preview_url: item.preview_url,
            uri: item.uri,
            image: item.album.images[2].url,
            duration: item.duration_ms,
            artistURI: item.artists[0].uri
        })
        return null
    })
    return allTracks
}


// https://github.com/bchiang7/spotify-profile/blob/main/client/src/utils/index.js
export const formatDuration = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds: any = ((millis % 60000) / 1000).toFixed(0);
    const duration: string = `${minutes.toString()}:${seconds < 10 ? '0' : ''}${seconds}`;
    return duration
};

export const getURIs = (tracks: track[]): string[] => {
    const URIarray: string[] = []
    tracks && tracks.forEach((track) => {
        URIarray.push(track.uri)
    })
    return URIarray
}

export const getTrackURIs = (tracks: any): string[] => {
    const URIArray: string[] = []
    tracks && tracks.forEach((track: any) => {
        URIArray.push(track.uri)
    })
    return URIArray
}

export const getArtistsIdsFromList = (tracks: any) => {
    const artistArray: string[] = []
    tracks && tracks.forEach((track: any) => {
        artistArray.push(track.artists.map((artist: any) => { return artist.id }))
    })
    return [...new Set(artistArray.flat())]
}

export const getGenresFromArtist = (artists: any) => {
    const genreArray: string[] = []
    artists && artists.forEach((artist: any) => {
        genreArray.push(artist.genres.map((genre: string) => genre))
    })
    const flatArray = genreArray.flat()

    return [...new Set(flatArray)]
}

