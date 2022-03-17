"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArtistInfoFromIds = exports.getArtist = exports.getAvailableGenreSeeds = exports.getAudioFeaturesMany = exports.getDevice = exports.getTopArtistsLong = exports.getTopArtistsMedium = exports.getTopArtistsShort = exports.getRecentlyPlayed = exports.getTopTracksShort = exports.getTopTracksMedium = exports.getTopTracksLong = exports.getUser = exports.headers = exports.token = exports.GetAccessToken = exports.getHashParams = exports.logout = void 0;
const axios_1 = __importDefault(require("axios"));
// TOKENS ******************************************************************************************
const EXPIRATION_TIME = 3600 * 1000; // 3600 seconds * 1000 = 1 hour in milliseconds
const setTokenTimestamp = () => window.localStorage.setItem('spotify_token_timestamp', Date.now().toString());
const setLocalAccessToken = (token) => {
    setTokenTimestamp();
    window.localStorage.setItem('spotify_access_token', token);
};
const setLocalRefreshToken = (token) => token && window.localStorage.setItem('spotify_refresh_token', token);
const getTokenTimestamp = () => window.localStorage.getItem('spotify_token_timestamp') || "{}"; //!what is this
const getLocalAccessToken = () => window.localStorage.getItem('spotify_access_token');
const getLocalRefreshToken = () => window.localStorage.getItem('spotify_refresh_token');
const logout = () => {
    window.localStorage.removeItem('spotify_token_timestamp');
    window.localStorage.removeItem('spotify_access_token');
    window.localStorage.removeItem('spotify_refresh_token');
    window.location.reload();
};
exports.logout = logout;
const client_id = "595bf34db17741f0a2d9cac0eaeb7bce";
const client_secret = "0dc47801082147d588f35d47e12a2cb8";
// Refresh the token
const refreshAccessToken = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("refresh token attempt");
        // const { data } = await axios.get(`/refresh_token?refresh_token=${getLocalRefreshToken()}`);
        const refreshToken = getLocalRefreshToken();
        console.log(refreshToken);
        const test = "test";
        const { data } = yield axios_1.default.post(`http://localhost:3000/refresh_token/${refreshToken}`);
        console.log(data);
        const { access_token } = data;
        setLocalAccessToken(access_token);
        return;
    }
    catch (e) {
        console.error(e);
    }
});
const getHashParams = () => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    console.log(params);
    const tokens = {
        access_token: params.get("access_token"),
        refresh_token: params.get("refresh_token")
    };
    return tokens;
};
exports.getHashParams = getHashParams;
const GetAccessToken = () => {
    const { access_token, refresh_token } = (0, exports.getHashParams)();
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
};
exports.GetAccessToken = GetAccessToken;
exports.token = (0, exports.GetAccessToken)();
// API Calls **********************************************************************************
exports.headers = {
    Authorization: `Bearer ${exports.token}`,
    "Content-Type": "application/json",
};
// export const getUser = () =>{ return axios.get('https://api.spotify.com/v1/me', { headers })};
const getUser = (token) => {
    try {
        const headers = {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "application/json",
        };
        // console.log(token);
        return axios_1.default.get('https://api.spotify.com/v1/me', { headers });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getUser = getUser;
const getTopTracksLong = () => axios_1.default.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term', { headers: exports.headers });
exports.getTopTracksLong = getTopTracksLong;
const getTopTracksMedium = () => axios_1.default.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term', { headers: exports.headers });
exports.getTopTracksMedium = getTopTracksMedium;
const getTopTracksShort = () => axios_1.default.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term', { headers: exports.headers });
exports.getTopTracksShort = getTopTracksShort;
const getRecentlyPlayed = (accessToken) => {
    try {
        console.log("recently played attempt");
        const headers = {
            Authorization: `Bearer ${exports.token}`,
            "Content-Type": "application/json",
        };
        return axios_1.default.get('https://api.spotify.com/v1/me/player/recently-played?limit=50', { headers });
    }
    catch (error) {
        console.log("player error");
        console.log(error);
    }
};
exports.getRecentlyPlayed = getRecentlyPlayed;
const getTopArtistsShort = () => axios_1.default.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term', {
    headers: exports.headers,
});
exports.getTopArtistsShort = getTopArtistsShort;
const getTopArtistsMedium = () => axios_1.default.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term', {
    headers: exports.headers,
});
exports.getTopArtistsMedium = getTopArtistsMedium;
const getTopArtistsLong = () => axios_1.default.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term', { headers: exports.headers });
exports.getTopArtistsLong = getTopArtistsLong;
const getDevice = () => axios_1.default.get('https://api.spotify.com/v1/me/player/devices', { headers: exports.headers });
exports.getDevice = getDevice;
const getAudioFeaturesMany = (ids) => axios_1.default.get(`https://api.spotify.com/v1/audio-features?ids=${ids.toString()}`, { headers: exports.headers });
exports.getAudioFeaturesMany = getAudioFeaturesMany;
const getAvailableGenreSeeds = () => axios_1.default.get("https://api.spotify.com/v1/recommendations/available-genre-seeds", { headers: exports.headers });
exports.getAvailableGenreSeeds = getAvailableGenreSeeds;
const getArtist = () => axios_1.default.get("https://api.spotify.com/v1/artists/5XQRfs0gXs30aWUn1Umves", { headers: exports.headers });
exports.getArtist = getArtist;
const getArtistInfoFromIds = (ids) => axios_1.default.get(`https://api.spotify.com/v1/artists?ids=${ids}`, { headers: exports.headers });
exports.getArtistInfoFromIds = getArtistInfoFromIds;
