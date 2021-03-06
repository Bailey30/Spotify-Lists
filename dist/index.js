"use strict";
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
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const query_string_1 = __importDefault(require("query-string"));
const request = require('request');
const cookieParser = require('cookie-parser');
const SpotifyWebApi = require('spotify-web-api-node');
const path = require("path");
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
// app.set("Access-Control-Allow-Origin", "https://localhost:3000/");
app.use(express_1.default.static(path.resolve(__dirname, '../client/build')));
app
    .use(express_1.default.static(path.resolve(__dirname, '../client/build')))
    .use((0, cors_1.default)())
    .use(cookieParser())
    .use(express_1.default.static(path.resolve(__dirname, '../client/build')));
app.get('/', function (req, res) {
    res.render(path.resolve(__dirname, '../client/build/index.html'));
});
app.get("/", (req, res) => {
    res.send("hello");
});
// Priority serve any static files.
const redirect_uri = "http://localhost:3000/callback";
const frontend_uri = "http://localhost:3001";
const client_id = process.env.CLIENT_ID;
// const client_id = "595bf34db17741f0a2d9cac0eaeb7bce"
const client_secret = process.env.CLIENT_SECRET;
const scope = 'user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public streaming user-read-playback-state user-modify-playback-state user-library-read user-library-modify';
const stateKey = "spotify_auth_state";
function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
;
app.get("/login", function (req, res) {
    const state = generateRandomString(16);
    //stateKey is name of cookie, state is random code
    res.cookie(stateKey, state);
    // your application requests authorization
    res.redirect('https://accounts.spotify.com/authorize?' +
        //! can i use querystring or something else?
        query_string_1.default.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state,
            show_dialog: true
        }));
});
//     //* then() itself returns a promise, which will be completed with the result of the function that was passed to it.
//     //! what data type is data? look up .then syntax vs await
app.get("/callback", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;
    const spotifyApi = new SpotifyWebApi({
        clientId: client_id,
        clientSecret: client_secret,
        redirectUri: redirect_uri
    });
    if (state === null || state !== storedState) {
        res.redirect('/#' +
            query_string_1.default.stringify({
                error: 'state_mismatch'
            }));
    }
    else {
        try {
            //gets code from redirect url
            const authGrant = yield spotifyApi.authorizationCodeGrant(req.query.code);
            console.log(authGrant);
            console.log(authGrant);
            const access_token = authGrant.body.access_token;
            const refresh_token = authGrant.body.refresh_token;
            // access token and refresh token in frontend url - 
            res.redirect(`${frontend_uri}/#${query_string_1.default.stringify({
                access_token,
                refresh_token
            })}`);
            console.log(authGrant);
        }
        catch (error) {
            console.log(error);
        }
    }
}));
// app.get('/callback', function (req, res) {
//     // your application requests refresh and access tokens
//     // after checking the state parameter
//     //? code and state are returned in the url in the redirect address after the authorisation request stage
//     var code = req.query.code || null;
//     var state = req.query.state || null;
//     var storedState = req.cookies ? req.cookies[stateKey] : null;
//     if (state === null || state !== storedState) {
//         res.redirect('/#' +
//             querystring.stringify({
//                 error: 'state_mismatch'
//             }));
//     } else {
//         res.clearCookie(stateKey);
//         var authOptions = {
//             url: 'https://accounts.spotify.com/api/token',
//             form: {
//                 code: code,
//                 redirect_uri: redirect_uri,
//                 grant_type: 'authorization_code'
//             },
//             headers: {
//                 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
//             },
//             json: true
//         };
//         request.post(authOptions, function (error: any, response: any, body: any) {
//             if (!error && response.statusCode === 200) {
//                 console.log("body: ", body);
//                 var access_token = body.access_token,
//                     refresh_token = body.refresh_token;
//                 var options = {
//                     url: 'https://api.spotify.com/v1/me',
//                     headers: { 'Authorization': 'Bearer ' + access_token },
//                     json: true
//                 };  
//                 // use the access token to access the Spotify Web API
//                 request.get(options, function (error: any, response: any, body: any) {
//                     console.log(body);
//                 });
//                 // we can also pass the token to the browser to make requests from there
//                 res.redirect(`${frontend_uri}/#${querystring.stringify({
//                     access_token: access_token,
//                     refresh_token: refresh_token
//                 })}`);
//             } else {
//                 res.redirect('/#' +
//                     querystring.stringify({
//                         error: 'invalid_token'
//                     }));
//             }
//         });
//     }
// });
app.post('/refresh_token/:refreshToken', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("/refresh_token");
        // requesting access token from refresh token
        const refresh_token = req.params.refreshToken;
        console.log("refresh token: ", refresh_token);
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
            form: {
                grant_type: 'refresh_token',
                refresh_token: refresh_token
            },
            json: true
        };
        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                const access_token = body.access_token;
                console.log("accesToken: ", access_token);
                res.send({ access_token });
            }
            console.log("test");
        });
    });
});
// All remaining requests return the React app, so it can handle routing.
app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, '../client/public', 'index.html'));
});
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
