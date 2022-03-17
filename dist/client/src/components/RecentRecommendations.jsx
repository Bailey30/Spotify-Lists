"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const axios_1 = __importDefault(require("axios"));
const react_1 = __importStar(require("react"));
require("../styles/recentRecommendations.css");
const store_1 = require("./store");
const spotify_1 = require("../spotify");
const utils_1 = require("../utils");
const List_1 = __importDefault(require("./List"));
const RecentRecommendations = ({ accessToken }) => {
    const { playingTrack, setPlayingTrack, playArray, setPlayArray, setRecentTracks, recentTracks, trackName, setTrackName } = (0, react_1.useContext)(store_1.StoreContext);
    const [recentArtistURIs, setRecentArtistURIs] = (0, react_1.useState)([]);
    const [recommendedArtistTracks, setRecommendedArtistTracks] = (0, react_1.useState)([]);
    const [recommendedTrackTracks, setRecommendedTrackTracks] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const trackData = () => __awaiter(void 0, void 0, void 0, function* () {
            const tracks = yield (0, utils_1.getTracks)(accessToken);
            setRecentTracks(tracks);
        });
        trackData();
    }, []);
    // take artist URis from recent songs list
    (0, react_1.useEffect)(() => {
        const URIarray = [];
        recentTracks && recentTracks.forEach((track) => {
            URIarray.push(track.artistURI);
        });
        setRecentArtistURIs(URIarray);
        console.log(recentTracks);
    }, [recentTracks]);
    // where recent artist uris have been obtained use them to get recommendations
    (0, react_1.useEffect)(() => {
        getRecentArtistRecommendations();
        getRecentTrackRecommendations();
    }, [recentArtistURIs]);
    // gather unique URI's and obtain just the numbers
    // then push fetched data to recommended tracks array
    const getRecentArtistRecommendations = () => __awaiter(void 0, void 0, void 0, function* () {
        const uniqueURIs = [...new Set(recentArtistURIs)];
        const URInums = uniqueURIs.map((item) => item.replace("spotify:artist:", ""));
        const data = yield axios_1.default.get(`https://api.spotify.com/v1/recommendations?seed_artists=${URInums.slice(0, 5)}&limit=50`, { headers: spotify_1.headers });
        const allTracks = (0, utils_1.pushSelectedInfo)(data.data.tracks);
        setRecommendedArtistTracks(allTracks);
    });
    const getRecentTrackRecommendations = () => __awaiter(void 0, void 0, void 0, function* () {
        const trackURIs = (0, utils_1.getTrackURIs)(recentTracks);
        const uniqueURIs = [...new Set(trackURIs)];
        const URInums = uniqueURIs.map((item) => item.replace("spotify:track:", ""));
        const data = yield axios_1.default.get(`https://api.spotify.com/v1/recommendations?seed_tracks=${URInums.slice(0, 5)}&limit=50`, { headers: spotify_1.headers });
        const allTracks = (0, utils_1.pushSelectedInfo)(data.data.tracks);
        setRecommendedTrackTracks(allTracks);
    });
    // when choosing a song - send whole list to player
    const handlePlayer = (i, tracks) => {
        setPlayingTrack(i);
        const uris = (0, utils_1.getURIs)(tracks);
        setPlayArray(uris);
        setTrackName(tracks[i].name);
    };
    return (<div className="main">
            {recommendedArtistTracks && <List_1.default tracks={recommendedArtistTracks} handlePlayer={handlePlayer} title={"based on recent artists"}/>}
            
            {recommendedTrackTracks && <List_1.default tracks={recommendedTrackTracks} handlePlayer={handlePlayer} title={"based on recent tracks"}/>}
        </div>);
};
exports.default = RecentRecommendations;
