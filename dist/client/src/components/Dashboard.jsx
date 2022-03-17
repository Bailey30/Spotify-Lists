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
const react_router_dom_1 = require("react-router-dom");
require("../styles/dashboard.css");
const spotify_1 = require("../spotify");
const Player_1 = require("./Player");
const Profile_1 = __importDefault(require("./Profile"));
const TopArtists_1 = __importDefault(require("./TopArtists"));
const store_1 = __importDefault(require("./store"));
const RecentRecommendations_1 = __importDefault(require("./RecentRecommendations"));
const Nav_1 = require("./Nav");
const RecentTracks_1 = __importDefault(require("./RecentTracks"));
const TopTracks_1 = __importDefault(require("./TopTracks"));
function Dashboard() {
    const [accessToken, setaccessToken] = (0, react_1.useState)("");
    const [user, setUser] = (0, react_1.useState)();
    const [showNav, setShowNav] = (0, react_1.useState)(false);
    const getUserData = (accessToken) => __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, spotify_1.getUser)(accessToken);
        const { display_name, email, external_urls, images } = data === null || data === void 0 ? void 0 : data.data;
        setUser({ name: display_name, email: email, profile: external_urls.spotify, image: images[0] });
    });
    (0, react_1.useEffect)(() => {
        setaccessToken(spotify_1.token);
    }, []);
    (0, react_1.useEffect)(() => {
        getUserData(accessToken);
        console.log(accessToken);
    }, [accessToken]);
    (0, react_1.useEffect)(() => {
        console.log(showNav);
    }, [showNav]);
    return (<div>
      <store_1.default>
        <Profile_1.default user={user} setShowNav={setShowNav} showNav={showNav}/>
        <div className='main'>
          <react_router_dom_1.BrowserRouter>
            <Nav_1.Nav showNav={showNav} setShowNav={setShowNav}/>
            <div className='pages'>
              <react_router_dom_1.Routes>
                <react_router_dom_1.Route path="/" element={<RecentRecommendations_1.default accessToken={accessToken}/>}/>
                <react_router_dom_1.Route path="/topArtists" element={<TopArtists_1.default />}/>
                <react_router_dom_1.Route path="/topTracks" element={<TopTracks_1.default />}/>
                <react_router_dom_1.Route path="/recentTracks" element={<RecentTracks_1.default accessToken={accessToken}/>}/>
              </react_router_dom_1.Routes>
            </div>
          </react_router_dom_1.BrowserRouter>
        </div>
        <Player_1.Player accessToken={accessToken}/>
      </store_1.default>
    </div>);
}
exports.default = Dashboard;
