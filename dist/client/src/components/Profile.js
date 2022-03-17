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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("../styles/profile.css");
const Spotify_Icon_RGB_Green_png_1 = __importDefault(require("../images/Spotify_Icon_RGB_Green.png"));
const ai_1 = require("react-icons/ai");
const Profile = ({ user, setShowNav, showNav }) => {
    const [show, setShow] = (0, react_1.useState)(true);
    const [lastScroll, setLastScroll] = (0, react_1.useState)();
    window.addEventListener("scroll", () => {
        let currentScroll = window.scrollY;
        if (currentScroll > lastScroll) {
            setShow(false);
        }
        else if (currentScroll < lastScroll) {
            setShow(true);
        }
        setLastScroll(currentScroll);
    });
    (0, react_1.useEffect)(() => {
        console.log(showNav);
    }, [showNav]);
    const handleNav = () => {
        console.log("nav");
        setShowNav(!showNav);
    };
    return (<div className='header' style={{ opacity: show ? 1 : 0 }}>
            <div className="menuButton" onClick={handleNav}><ai_1.AiOutlineMenu /></div>
            <div className="nameAndIcon">
                <div className='userName'>{user === null || user === void 0 ? void 0 : user.name}</div>
                <div className='iconCont'>
                    <a href={`https://open.spotify.com/user/${user === null || user === void 0 ? void 0 : user.name}`}>
                    <img src={Spotify_Icon_RGB_Green_png_1.default} alt="green spotify icon" className='icon'/>
                    </a>
                </div>
            </div>
        </div>);
};
exports.default = Profile;
