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
require("./App.css");
const Login_1 = __importDefault(require("./components/Login"));
const Dashboard_1 = __importDefault(require("./components/Dashboard"));
const spotify_1 = require("./spotify");
const App = () => {
    const [access_Token, setAccess_Token] = (0, react_1.useState)();
    // on page load check for token - should be token
    (0, react_1.useEffect)(() => {
        setAccess_Token(spotify_1.token);
    }, []);
    console.log("accessToken from app.tsx: ", access_Token);
    console.log(typeof access_Token);
    return (<div className="App">
      {typeof access_Token === "string" ? <Dashboard_1.default /> : <Login_1.default />}
      {/* <Login/> */}
    </div>);
};
exports.default = App;
//click log in to get access token
//if access token => navigate to main page
//store access token in state
