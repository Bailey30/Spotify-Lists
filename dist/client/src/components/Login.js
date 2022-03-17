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
const gsap_1 = __importDefault(require("gsap"));
require("../styles/global.css");
require("../styles/login.css");
const LOGIN_URI = "http://localhost:3000/login";
const Login = () => {
    // user clicks login and app redirect to spotify authorization page (routes in server index.ts) 
    // app then redirects to /callback with access and refresh codes in url
    (0, react_1.useEffect)(() => {
        gsap_1.default.to(".background", {
            y: 0,
            duration: 0.5
        });
        gsap_1.default.to(".spotify", {
            y: 0,
            duration: 0.5,
            delay: 0.5
        });
        gsap_1.default.to(".lists", {
            y: 0,
            delay: 0.6,
        });
        gsap_1.default.to(".explanation", {
            y: 0,
            delay: 0.8
        });
        gsap_1.default.to(".link", {
            y: 0,
            delay: 1.5,
            opacity: 1
        });
    }, []);
    return (<div className='page'>
      <div className="background">
      </div>
      <div className="title">
        <div className="wordContainer">
          <div className="spotify word">SPOTIFY</div>

        </div>
        {/* <div className="wordContainer">
      <div className="quick word" >QUICK</div>
      
    </div> */}
        <div className="wordContainer">
          <div className="lists word">LISTS</div>

        </div>
      </div>
      <div className="wordContainer">
        <div className='explanation'>Quickly generate lists of recommended tracks based on your listening history and top artists</div>

      </div>
      <div className="wordContainer">
      <a href={LOGIN_URI} className="link">Login to Spotify</a>
      </div>
    </div>);
};
exports.default = Login;
