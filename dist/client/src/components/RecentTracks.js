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
const react_1 = __importStar(require("react"));
const store_1 = require("./store");
const utils_1 = require("../utils");
const List_1 = __importDefault(require("./List"));
require("../styles/topAndRecent.css");
const RecentTracks = ({ accessToken }) => {
    const { playingTrack, setPlayingTrack, playArray, setPlayArray, recentTracks, setRecentTracks, trackName, setTrackName } = (0, react_1.useContext)(store_1.StoreContext);
    (0, react_1.useEffect)(() => {
        const trackData = () => __awaiter(void 0, void 0, void 0, function* () {
            const tracks = yield (0, utils_1.getTracks)(accessToken);
            setRecentTracks(tracks);
        });
        trackData();
    }, [accessToken]);
    const handlePlayer = (i) => {
        setPlayingTrack(i);
        const uris = (0, utils_1.getURIs)(recentTracks);
        setPlayArray(uris);
        console.log(recentTracks);
        setTrackName(recentTracks[i].name);
    };
    return (<div className='main'>
        <List_1.default tracks={recentTracks} title={"recently played tracks"} handlePlayer={handlePlayer}/>
        </div>);
};
exports.default = RecentTracks;
