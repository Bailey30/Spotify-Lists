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
const spotify_1 = require("../spotify");
const utils_1 = require("../utils");
const store_1 = require("./store");
require("../styles/global.css");
require("../styles/topArtists.css");
const List_1 = __importDefault(require("./List"));
const TopArtists = () => {
    const [show, setShow] = (0, react_1.useState)(false);
    const [topArtists, setTopArtists] = (0, react_1.useState)();
    const [recommendedTracks, setRecommendedTracks] = (0, react_1.useState)();
    const { playingTrack, setPlayingTrack, playArray, setPlayArray, trackName, setTrackName, recentTracks } = (0, react_1.useContext)(store_1.StoreContext);
    (0, react_1.useEffect)(() => {
        getArtists();
    }, []);
    const getArtists = () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield (0, spotify_1.getTopArtistsLong)();
        console.log(data);
        const artists = data.data.items.map((artist) => ({ name: artist.name, id: artist.id }));
        console.log(artists);
        setTopArtists(artists);
        getRecommendedTracks(topArtists[0].id);
    });
    (0, react_1.useEffect)(() => {
        if (topArtists)
            getRecommendedTracks(topArtists[0].id);
    }, [topArtists]);
    const getRecommendedTracks = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const tracks = yield axios_1.default.get(`https://api.spotify.com/v1/recommendations?seed_artists=${id}&limit=50`, { headers: spotify_1.headers });
        console.log(tracks);
        const allTracks = (0, utils_1.pushSelectedInfo)(tracks.data.tracks);
        if (allTracks)
            setRecommendedTracks(allTracks);
    });
    const handlePlayer = (i) => {
        setPlayingTrack(i);
        const uris = (0, utils_1.getURIs)(recommendedTracks);
        setPlayArray(uris);
        console.log(recommendedTracks);
        setTrackName(recommendedTracks[i].name);
    };
    return (<div className='main'>
      {/* <div className='heading'>Top Artists</div> */}
      <div className="cont">
        {topArtists === null || topArtists === void 0 ? void 0 : topArtists.map((artist, i) => {
            return <div key={artist.id} onClick={() => getRecommendedTracks(artist.id)} className="listItem">{artist.name}</div>;
        })}
      </div>

      <div className="trackList">
      {<List_1.default tracks={recommendedTracks} handlePlayer={handlePlayer} title={"tracks based on artist"}/>}
      </div>
      {/* <List tracks={recentTracks} title={"listening history"} handlePlayer={handlePlayer}/> */}
    </div>);
};
exports.default = TopArtists;
