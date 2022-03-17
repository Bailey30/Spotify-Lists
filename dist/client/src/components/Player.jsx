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
exports.Player = void 0;
const react_1 = __importStar(require("react"));
require("../styles/player.css");
require("../styles/global.css");
const react_spotify_web_playback_1 = __importDefault(require("react-spotify-web-playback"));
const spotify_1 = require("../spotify");
const store_1 = require("./store");
const Player = ({ accessToken }) => {
    const [play, setPlay] = (0, react_1.useState)(false);
    const [device, setDevice] = (0, react_1.useState)();
    const { playingTrack, setPlayingTrack, playArray, setPlayArray, setRecentTracks, recentTracks, trackName, setTrackName } = (0, react_1.useContext)(store_1.StoreContext);
    const getDeviceData = () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("deviceDataAttempt");
        const data = yield (0, spotify_1.getDevice)();
        setDevice(data);
    });
    (0, react_1.useEffect)(() => {
        getDeviceData();
    }, []);
    (0, react_1.useEffect)(() => {
        console.log(device);
    }, [device]);
    (0, react_1.useEffect)(() => {
        setPlay(true);
    }, [playingTrack]);
    if (!accessToken)
        return null;
    return (<div>
        <div className="player">
            <react_spotify_web_playback_1.default persistDeviceSelection token={accessToken} showSaveIcon callback={state => !state.isPlaying && setPlay(false)} play={play} uris={playArray} offset={playingTrack} styles={{
            activeColor: "#fff",
            bgColor: "black",
            color: "#fff",
            loaderColor: "#fff",
            sliderColor: "#1cb954",
            trackArtistColor: "#ccc",
            trackNameColor: "#fff",
            height: "65px",
        }}/>
        </div>


    </div>);
};
exports.Player = Player;
