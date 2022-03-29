require('dotenv').config();
import express from "express"
import { Request, Response } from "express"
import cors from "cors"
import querystring from 'query-string';
const request = require('request');
const cookieParser = require('cookie-parser');
const SpotifyWebApi = require('spotify-web-api-node');
const path = require("path")
const history = require('connect-history-api-fallback');

const port = process.env.PORT || 3000;
const app = express()

// app.set("Access-Control-Allow-Origin", "https://localhost:3000/");

app.use(express.static(path.resolve(__dirname, '../client/build')));


app
    .use(express.static(path.resolve(__dirname, '../client/build')))
    .use(cors())
    .use(cookieParser())
    .use(
        history({
          verbose: true,
          rewrites: [
            { from: /\/login/, to: '/login' },
            { from: /\/callback/, to: '/callback' },
            { from: /\/refresh_token/, to: '/refresh_token' },
          ],
        }),
      )
    .use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/', function (req, res) {
    res.render(path.resolve(__dirname, '../client/build/index.html'));
});


const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// Priority serve any static files.

let REDIRECT_URI = process.env.REDIRECT_URI || "http://localhost:3000/callback"
let FRONTEND_URI = process.env.FRONTEND_URI || "http://localhost:3001"
if (process.env.NODE_ENV !== 'production') {
    REDIRECT_URI = 'http://localhost:3000/callback';
    FRONTEND_URI = 'http://localhost:3001';
  }

const scope = 'user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public streaming user-read-playback-state user-modify-playback-state user-library-read user-library-modify'
const stateKey = "spotify_auth_state"


function generateRandomString(length: number): string {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

app.get("/login", function (req: Request, res: Response) {
    const state = generateRandomString(16);
    //stateKey is name of cookie, state is random code
    res.cookie(stateKey, state);
    console.log(CLIENT_ID);
    // your application requests authorization
    res.redirect('https://accounts.spotify.com/authorize?' +
        //! can i use querystring or something else?
        querystring.stringify({
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: scope,
            redirect_uri: REDIRECT_URI,
            state: state,
            show_dialog: true
        }));
});



//     //* then() itself returns a promise, which will be completed with the result of the function that was passed to it.
//     //! what data type is data? look up .then syntax vs await

app.get("/callback", async (req: Request, res: Response) => {

    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    const spotifyApi = new SpotifyWebApi({
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        redirectUri: REDIRECT_URI
    });

    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        try {
            //gets code from redirect url
            const authGrant = await spotifyApi.authorizationCodeGrant(req.query.code)
            console.log(authGrant);

            const access_token = authGrant.body.access_token;
            const refresh_token = authGrant.body.refresh_token;

            // access token and refresh token in frontend url - 
            res.redirect(`${FRONTEND_URI}/#${querystring.stringify({
                access_token,
                refresh_token
            })}`)
            console.log(authGrant);

        } catch (error) {
            console.log(error);
        }
    }
})

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

app.get('/refresh_token/:refreshToken', async function (req, res) { //404 error not found
    console.log("/refresh_token");

    // requesting access token from refresh token
    const refresh_token = req.params.refreshToken
    console.log("refresh token: ", refresh_token);
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')) },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function (error: any, response: any, body: any) {
        if (!error && response.statusCode === 200) {
            const access_token = body.access_token;
            console.log("accesToken: ", access_token);
            res.send({ access_token });
        }
        console.log("test");
    });
});

 // All remaining requests return the React app, so it can handle routing.
  app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, '../client/public', 'index.html'));
  });
app.listen(port, () => {
    console.log(`listening on ${port}`);
})