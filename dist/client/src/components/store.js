"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreContext = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
exports.StoreContext = (0, react_2.createContext)({
    recentTracks: [],
    setRecentTracks: () => { },
    playingTrack: 0,
    setPlayingTrack: () => { },
    playArray: [],
    setPlayArray: () => { },
    trackName: "",
    setTrackName: () => { }
});
// eslint-disable-next-line import/no-anonymous-default-export
exports.default = ({ children }) => {
    const [recentTracks, setRecentTracks] = (0, react_2.useState)();
    const [playingTrack, setPlayingTrack] = (0, react_2.useState)();
    const [playArray, setPlayArray] = (0, react_2.useState)();
    const [trackName, setTrackName] = (0, react_2.useState)();
    return <exports.StoreContext.Provider value={{
            recentTracks, setRecentTracks,
            playingTrack, setPlayingTrack,
            playArray, setPlayArray,
            trackName, setTrackName
        }}>{children}</exports.StoreContext.Provider>;
};
