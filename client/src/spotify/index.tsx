import axios from "axios"
import React, { useState } from "react"

interface Tokens {

    access_token: string | null
    refresh_token: string | null
}



// TOKENS ******************************************************************************************
const EXPIRATION_TIME = 3600 * 1000; // 3600 seconds * 1000 = 1 hour in milliseconds

const setTokenTimestamp = () => window.localStorage.setItem('spotify_token_timestamp', Date.now().toString());
const setLocalAccessToken = (token: string) => {
    setTokenTimestamp();
    window.localStorage.setItem('spotify_access_token', token);
};
const setLocalRefreshToken = (token: string | null) => token && window.localStorage.setItem('spotify_refresh_token', token)
const getTokenTimestamp = () => window.localStorage.getItem('spotify_token_timestamp') || "{}"; //!what is this
const getLocalAccessToken = () => window.localStorage.getItem('spotify_access_token');
const getLocalRefreshToken = () => window.localStorage.getItem('spotify_refresh_token');


export const logout = () => {
    window.localStorage.removeItem('spotify_token_timestamp');
    window.localStorage.removeItem('spotify_access_token');
    window.localStorage.removeItem('spotify_refresh_token');
    window.location.reload();
};

const client_id = "595bf34db17741f0a2d9cac0eaeb7bce"
const client_secret = "0dc47801082147d588f35d47e12a2cb8"
// Refresh the token
const refreshAccessToken = async () => {
    try {
        console.log("refresh token attempt");
        // const { data } = await axios.get(`/refresh_token?refresh_token=${getLocalRefreshToken()}`);
        const refreshToken = getLocalRefreshToken()
        console.log(refreshToken);
        const test = "test"
        const { data } = await axios.post(`http://localhost:3000/refresh_token/${refreshToken}`)
        console.log(data);
        const { access_token } = data;
        setLocalAccessToken(access_token);
        return;
    } catch (e) {
        console.error(e);
    }
};

export const getHashParams = () => {

    const params = new URLSearchParams(window.location.hash.substring(1));

    console.log(params);
    const tokens: Tokens = {
        access_token: params.get("access_token"),
        refresh_token: params.get("refresh_token")
    }
    return tokens
};

export const GetAccessToken = () => {
    const { access_token, refresh_token } = getHashParams()


    // If token has expired
    if (Date.now() - parseInt(getTokenTimestamp()) > EXPIRATION_TIME) {
        console.warn('Access token has expired, refreshing...');
        refreshAccessToken();
    }

    const localAccessToken = getLocalAccessToken();

    // If there is no ACCESS token in local storage, set it and return `access_token` from params
    if ((!localAccessToken || localAccessToken === 'undefined') && access_token) {
        setLocalAccessToken(access_token);
        setLocalRefreshToken(refresh_token);
        return access_token;
    }
    console.log(localAccessToken);
    // console.log(refresh_token);
    return localAccessToken;

}

export const token = GetAccessToken()

// API Calls **********************************************************************************

export const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
}

// export const getUser = () =>{ return axios.get('https://api.spotify.com/v1/me', { headers })};

export const getUser = (token: string | null) => {
    try {
        const headers = {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "application/json",
        }
        // console.log(token);
        return axios.get('https://api.spotify.com/v1/me', { headers })
    } catch (error) {
        console.log(error);
    }
}

export const getTopTracksLong = () =>
    axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term', { headers });
export const getTopTracksMedium = () =>
    axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term', { headers });
export const getTopTracksShort = () =>
    axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term', { headers });

export const getRecentlyPlayed = (accessToken: string | null) => {
    try {
        console.log("recently played attempt");
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
        return axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=50', { headers });
    } catch (error) {
        console.log("player error");
        console.log(error);
    }

}

export const getTopArtistsShort = () =>
    axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term', {
        headers,
    });
export const getTopArtistsMedium = () =>
    axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term', {
        headers,
    });
export const getTopArtistsLong = () =>
    axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term', { headers });

export const getDevice = () => axios.get('https://api.spotify.com/v1/me/player/devices', { headers })


export const getAudioFeaturesMany = (ids: string[]) => axios.get(`https://api.spotify.com/v1/audio-features?ids=${ids.toString()}`, { headers })

export const getAvailableGenreSeeds = () => axios.get("https://api.spotify.com/v1/recommendations/available-genre-seeds", { headers })

export const getArtist = () => axios.get("https://api.spotify.com/v1/artists/5XQRfs0gXs30aWUn1Umves", { headers })

export const getArtistInfoFromIds = (ids: string[]) => axios.get(`https://api.spotify.com/v1/artists?ids=${ids}`, { headers })