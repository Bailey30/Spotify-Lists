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
const spotify_1 = require("../spotify");
const utils_1 = require("../utils");
const List_1 = __importDefault(require("./List"));
const store_1 = require("./store");
require("../styles/topAndRecent.css");
function TopTracks() {
    const [show, setShow] = (0, react_1.useState)(false);
    const [topTracks, setTopTracks] = (0, react_1.useState)([]);
    const [range, setRange] = (0, react_1.useState)();
    const ranges = ["All time", "Last 6 months", "Last 4 weeks"];
    const [value, setValue] = (0, react_1.useState)();
    const { playingTrack, setPlayingTrack, playArray, setPlayArray, trackName, setTrackName } = (0, react_1.useContext)(store_1.StoreContext);
    const getTracks = () => __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, spotify_1.getTopTracksLong)();
        console.log(data);
        const allTracks = (0, utils_1.pushSelectedInfo)(data.data.items);
        setTopTracks(allTracks);
    });
    (0, react_1.useEffect)(() => {
        getTracks();
        setValue(0);
    }, []);
    (0, react_1.useEffect)(() => {
        function callAPI(range) {
            return __awaiter(this, void 0, void 0, function* () {
                let data;
                if (range === ranges[0]) {
                    data = yield (0, spotify_1.getTopTracksLong)();
                    setValue(0);
                }
                else if (range === ranges[1]) {
                    data = yield (0, spotify_1.getTopTracksMedium)();
                    setValue(1);
                }
                else if (range === ranges[2]) {
                    data = yield (0, spotify_1.getTopTracksShort)();
                    setValue(2);
                }
                const allTracks = (0, utils_1.pushSelectedInfo)(data === null || data === void 0 ? void 0 : data.data.items);
                setTopTracks(allTracks);
            });
        }
        callAPI(range);
    }, [range]);
    // when choosing a song - send whole list to player
    const handlePlayer = (i) => {
        setPlayingTrack(i);
        const uris = (0, utils_1.getURIs)(topTracks);
        setPlayArray(uris);
        console.log(topTracks);
        setTrackName(topTracks[i].name);
    };
    return (<div className='body'>
            {/* <div className='timeRange'>
            {ranges.map((range, i)=> {
                return <span className={`${i === value && "hover"}`}
                onClick={()=> setRange(ranges[i])}
                >{ranges[i]}</span>
            })}
        </div> */}
        <div className="main">
            <List_1.default tracks={topTracks} title={"your most played tracks"} handlePlayer={handlePlayer} setRange={setRange} value={value}/>
            </div>
        </div>);
}
exports.default = TopTracks;
