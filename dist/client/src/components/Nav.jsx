"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nav = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
require("../styles/nav.css");
require("../styles/global.css");
const Nav = ({ showNav, setShowNav }) => {
    // const mediaMatch = window.matchMedia("(max-width: 768px)")
    // const [matches, setMatches] = useState(mediaMatch.matches);
    // useEffect(() => {
    //     const handler = (e: { matches: boolean | ((prevState: boolean) => boolean) }) => setMatches(e.matches);
    //     mediaMatch.addListener(handler);
    //     console.log(mediaMatch);
    //     return () => mediaMatch.removeListener(handler);
    //   });
    //   useEffect(()=> {
    //       console.log(matches);
    //   },[matches])
    const styles = {
        transform: `translate(0px, 0px)`,
    };
    return (<div>
            <div className='nav' style={showNav ? styles : null}>
                <span onClick={() => setShowNav(!showNav)}>close</span>
                <div className="links">
                    <div className='navHeader'>LISTS</div>
                    <react_router_dom_1.Link to="/" className='navItem'>Recent tracks and artists</react_router_dom_1.Link>
                    <react_router_dom_1.Link to="/topArtists" className='navItem'>Your top artists</react_router_dom_1.Link>
                    <hr className='horizontalRule'></hr>
                    <div className="navHeader">YOUR ACCOUNT</div>
                    <react_router_dom_1.Link to="/topTracks" className='navItem'>Top tracks</react_router_dom_1.Link>
                    <react_router_dom_1.Link to="/recentTracks" className='navItem'>Listening history</react_router_dom_1.Link>
                </div>
            </div>
        </div>);
};
exports.Nav = Nav;
