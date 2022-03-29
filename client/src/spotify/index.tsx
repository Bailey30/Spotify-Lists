import axios from "axios"

import { useEffect } from "react"


interface Tokens {
    access_tokenparam: string | null
    refresh_tokenparam: string | null
    expires_inparam: number
}

// TOKENS ******************************************************************************************
const EXPIRATION_TIME = 3600; // 3600 seconds * 1000 = 1 hour in milliseconds

const setTokenTimestamp = () => window.localStorage.setItem('spotify_token_timestamp', Date.now().toString());

const setLocalAccessToken = (token: string) => {
    setTokenTimestamp();
    window.localStorage.setItem('spotify_access_token', token);
};
export const getLocalAccessToken = () => {
    const localAccessToken = window.localStorage.getItem('spotify_access_token')
    return localAccessToken
}

const setLocalRefreshToken = (token: string | null) => token && window.localStorage.setItem('spotify_refresh_token', token)

const getTokenTimestamp = () => window.localStorage.getItem('spotify_token_timestamp') || "{}"; //!what is this

const getLocalRefreshToken = () => window.localStorage.getItem('spotify_refresh_token');


// Refresh the token
const refreshAccessToken = async (refresh_token: string | null) => {
    try {
        const { data } = await axios.post(`http://localhost:4000/refresh_token/${refresh_token}`)
        const { access_token } = data;
        setLocalAccessToken(access_token);
    } catch (e) {
        console.error(e);
    }
};

export const getHashParams = () => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const tokens: Tokens = {
        access_tokenparam: params.get("access_token"),
        refresh_tokenparam: params.get("refresh_token"),
        expires_inparam: parseInt(params.get("expires_in")!)
    }
    return tokens
};

export const GetAccessToken = (access_tokenparam?: any, refresh_tokenparam?: any, expires_inparam?: any) => {
    useEffect(() => {
        setLocalAccessToken(access_tokenparam)
        setLocalRefreshToken(refresh_tokenparam)
    }, [access_tokenparam])

    const localAccessToken = getLocalAccessToken();
    getLocalAccessToken()

    return localAccessToken;

}

export const getToken = () => {

    if (Date.now() - parseInt(getTokenTimestamp()) as number > EXPIRATION_TIME) {
        console.warn('Access token has expired, refreshing...');
        const refresh_token = getLocalRefreshToken()
        refreshAccessToken(refresh_token);
        const new_access_token = getLocalAccessToken()
        return new_access_token
    } else {
        return getLocalAccessToken()
    }
}

export const token = getToken()

// API Calls **********************************************************************************

const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
}

// export const getUser = () =>{ return axios.get('https://api.spotify.com/v1/me', { headers })};

export const getUser = () => {
    try {
        return axios.get('https://api.spotify.com/v1/me', { headers })
    } catch (error) {
        console.log(error);
    }
}

export const getTopTracksLong = () => {

    return axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term', { headers });
}
export const getTopTracksMedium = () => {

    return axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term', { headers });
}
export const getTopTracksShort = () => {

    return axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term', { headers });
}

export const getRecentlyPlayed = async () => {
    if (headers.Authorization === 'Bearer null') {
        window.location.reload()
    }
    return await axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=50', { headers });
}

export const getTopArtistsShort = () => {
    return axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term', { headers });
}
export const getTopArtistsMedium = () => {
    return axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term', { headers });
}
export const getTopArtistsLong = () => {
    return axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term', { headers });
}

export const getDevice = () => {
    return axios.get('https://api.spotify.com/v1/me/player/devices', { headers })
}

export const getAudioFeaturesMany = (ids: string[]) => {
    return axios.get(`https://api.spotify.com/v1/audio-features?ids=${ids.toString()}`, { headers })
}

export const getAvailableGenreSeeds = () => {
    return axios.get("https://api.spotify.com/v1/recommendations/available-genre-seeds", { headers })
}

export const getArtist = () => {
    return axios.get("https://api.spotify.com/v1/artists/5XQRfs0gXs30aWUn1Umves", { headers })
}

export const getArtistInfoFromIds = (ids: string[]) => {
    return axios.get(`https://api.spotify.com/v1/artists?ids=${ids}`, { headers })
}

export const recentArtistRecommendations = (URInums: any) => {
    return axios.get(`https://api.spotify.com/v1/recommendations?seed_artists=${URInums.slice(0, 5)}&limit=50`, { headers })
}

export const recentTrackRecommendation = (URInums: any) => {
    return axios.get(`https://api.spotify.com/v1/recommendations?seed_tracks=${URInums.slice(0, 5)}&limit=50`, { headers })
}

export const getTopArtistRecommendedTracks = (id: string) => {
    return axios.get(`https://api.spotify.com/v1/recommendations?seed_artists=${id}&limit=50`, { headers })
}