require('dotenv').config();
import express, { response } from "express"
import { Request, Response } from "express"
import cors from "cors"
import querystring from 'query-string';
const cookieParser = require('cookie-parser');
const path = require("path")
const history = require('connect-history-api-fallback');
import axios from "axios"
const request = require('request');


// const port = process.env.PORT || 4000;
const port = 4000;
const app = express()

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

let REDIRECT_URI = process.env.REDIRECT_URI || "http://localhost:4000/callback"
let FRONTEND_URI = process.env.FRONTEND_URI || "http://localhost:3000"
if (process.env.NODE_ENV !== 'production') {
    REDIRECT_URI = 'http://localhost:4000/callback';
    FRONTEND_URI = 'http://localhost:3000';
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

app.get("/login", function (req, res) {
    console.log("got to /login");
    const state = generateRandomString(16)
    res.cookie(stateKey, state);
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
})

app.get("/callback", async (req: Request, res: Response) => {
    var code: string = req.query.code as string;

    let data = {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
    };
    const headers: any = {
        "Content-Type": "application/x-www-form-urlencoded",
    }
    try {
        const axiosRes: any = await axios.post(
            "https://accounts.spotify.com/api/token",
            querystring.stringify(data),
            headers
        )
            .then((response) => {
                const access_token = response.data.access_token
                const refresh_token = response.data.refresh_token
                const expires_in = response.data.expires_in
                res.redirect(`${FRONTEND_URI}/#${querystring.stringify({
                    access_token,
                    refresh_token,
                    expires_in,
                    code
                })}`)
            })
    } catch (error) {
        console.log(error);
    }
})

app.post('/refresh_token/:refreshToken', async function (req, res) { //404 error not found
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

   await request.post(authOptions, function (error: any, response: any, body: any) {
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

// http://localhost:3001/#access_token=BQAt_ysbFcbJRySB4j9anFQRm2f523oHpboqWUUBUPBrqIwEZkN1P3J6RGZp6OeX71C6UylzEVB4u2J8tEiZtbdBnB7DMdVfVFN49nO7efMHmITzPAGjJpJGABF5R1MakgmylrH3zG0lgI7fTkIw8JDn2NQjzqemSuDPBtizIos8GPzHNBGn6z5tPFS1Z68IKx-9_HSVQ55BgzrOHQLqrG4DAZ2szarLNW-L7hkmqMpy1tPfj3DG3dU&refresh_token=AQDDMiDxor83ZjOGdZ-KSOxvrnAdq-jdlAHG5iR1MD6jRqSy9hruwqmeeoAZZ--2AaY3mHcfHilC8yvtQBwo-A6p5Fc75zbef9Ul_-qLYFCLx1iR8jiyEdO_kcg98wZtEeA