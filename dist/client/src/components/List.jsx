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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const bs_1 = require("react-icons/bs");
require("../styles/list.css");
const utils_1 = require("../utils");
const store_1 = require("./store");
const List = (props) => {
    const [show, setShow] = (0, react_1.useState)(false);
    const { playingTrack, setPlayingTrack, playArray, setPlayArray, recentTracks, setRecentTracks, trackName, setTrackName } = (0, react_1.useContext)(store_1.StoreContext);
    // console.log(props);
    const [hover, setHover] = (0, react_1.useState)();
    const ranges = ["All time", "Last 6 months", "Last 4 weeks"];
    console.log(props.value);
    return (<div className="tracksColumn">
      <div className="headingCont">
        <div className="listHeading">{props.title}</div>

        {props.setRange ?
            <div className='timeRange'>
            {ranges.map((range, i) => {
                    return <span className={`${i === props.value && "hover"}`} style={{ marginLeft: "20px" }} onClick={() => props.setRange(ranges[i])}>{ranges[i]}</span>;
                })}
          </div>
            : null}
      </div>
      {props.tracks && props.tracks.slice(0, show ? 50 : 9).map((song, i) => {
            return <div key={i} className="tracksRow" onClick={() => props.handlePlayer(i, props.tracks)} onMouseOver={() => setHover(i)} onMouseLeave={() => setHover(null)}>
          <img src={song.image} alt="album art"/>
          {/* {(trackName === props.tracks[i].name || hover) && <span className='playIcon'><BsFillPlayFill/></span>} */}
          <span className='playIcon' style={{ opacity: (trackName === props.tracks[i].name || hover === i) ? "1" : "0" }}><bs_1.BsFillPlayFill /></span>
          <div className='nameAndArtist'>
            <span className='songName'>{song.name}</span>
            <span className="songArtist">{song.artist}</span>
          </div>
          <span className='songDuration'>{(0, utils_1.formatDuration)(song.duration)}</span>
        </div>;
        })}
      <span onClick={() => setShow(!show)} className="showMore">Show {show ? "less" : "more"}</span>
    </div>);
};
exports.default = List;
