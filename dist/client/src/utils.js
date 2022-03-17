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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGenresFromArtist = exports.getArtistsIdsFromList = exports.getTrackURIs = exports.getURIs = exports.formatDuration = exports.pushSelectedInfo = exports.getTracks = void 0;
const spotify_1 = require("./spotify");
const getTracks = (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, spotify_1.getRecentlyPlayed)(accessToken);
        // console.log(data);
        const allTracks = [];
        data.data.items.map(function (item, i) {
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
            });
            return null;
        });
        return allTracks;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getTracks = getTracks;
const pushSelectedInfo = (data) => {
    const allTracks = [];
    data.map(function (item, i) {
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
        });
        return null;
    });
    return allTracks;
};
exports.pushSelectedInfo = pushSelectedInfo;
// https://github.com/bchiang7/spotify-profile/blob/main/client/src/utils/index.js
const formatDuration = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    const duration = `${minutes.toString()}:${seconds < 10 ? '0' : ''}${seconds}`;
    return duration;
};
exports.formatDuration = formatDuration;
const getURIs = (tracks) => {
    const URIarray = [];
    tracks && tracks.forEach((track) => {
        URIarray.push(track.uri);
    });
    return URIarray;
};
exports.getURIs = getURIs;
const getTrackURIs = (tracks) => {
    const URIArray = [];
    tracks && tracks.forEach((track) => {
        URIArray.push(track.uri);
    });
    return URIArray;
};
exports.getTrackURIs = getTrackURIs;
const getArtistsIdsFromList = (tracks) => {
    const artistArray = [];
    tracks && tracks.forEach((track) => {
        artistArray.push(track.artists.map((artist) => { return artist.id; }));
    });
    return [...new Set(artistArray.flat())];
};
exports.getArtistsIdsFromList = getArtistsIdsFromList;
const getGenresFromArtist = (artists) => {
    const genreArray = [];
    artists && artists.forEach((artist) => {
        genreArray.push(artist.genres.map((genre) => genre));
    });
    const flatArray = genreArray.flat();
    return [...new Set(flatArray)];
};
exports.getGenresFromArtist = getGenresFromArtist;
