const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { jsonToUrlEncoded } = require("./utils");

const app = express();

app.use(cors({ origin: true }));

const SPOTIFY_SCOPES =
  "ugc-image-upload user-read-recently-played user-top-read user-read-playback-position user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative user-follow-modify user-follow-read user-library-modify user-library-read user-read-email user-read-private";
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REDIRECT_URI =
  "http://localhost:5001/spotify-to-18a63/us-central1/api/authorize-callback";

const GOOGLE_SCOPES = "https://www.googleapis.com/auth/youtube";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI =
  "http://localhost:5001/spotify-to-18a63/us-central1/api/google-authorize-callback";

// http://localhost:5001/spotify-to-18a63/us-central1/api/spotify-authorize
// http://localhost:5001/spotify-to-18a63/us-central1/api/authorize-callback

// http://localhost:5001/spotify-to-18a63/us-central1/api/google-authorize

app.get("/spotify-authorize", (req, res) => {
  res.redirect(
    `https://accounts.spotify.com/authorize?response_type=code&client_id=${SPOTIFY_CLIENT_ID}${
      SPOTIFY_SCOPES ? `&scope=${encodeURIComponent(SPOTIFY_SCOPES)}` : ""
    }&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}`
  );
});

app.get("/authorize-callback", async (req, res) => {
  try {
    const tokenResponse = await axios({
      method: "POST",
      url: "https://accounts.spotify.com/api/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString(
            "base64"
          ),
      },
      data: jsonToUrlEncoded({
        grant_type: "authorization_code",
        code: req.query.code,
        SPOTIFY_redirect_uri: SPOTIFY_REDIRECT_URI,
      }),
    });

    const { access_token, refresh_token } = tokenResponse.data;

    res.redirect(
      `http://localhost:3333/storage?${jsonToUrlEncoded({
        access_token,
        refresh_token,
      })}`
    );
  } catch (error) {
    console.log(
      `ERROR: ${error.response.status}, ${error.response.statusText}`
    );
  }
});

app.get("/google-authorize", (req, res) => {
  console.log(
    `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${GOOGLE_CLIENT_ID}${
      GOOGLE_SCOPES ? `&scope=${encodeURIComponent(GOOGLE_SCOPES)}` : ""
    }&redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}`
  );
  res.redirect(
    `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${GOOGLE_CLIENT_ID}${
      GOOGLE_SCOPES ? `&scope=${encodeURIComponent(GOOGLE_SCOPES)}` : ""
    }&redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}`
  );
});

exports.api = functions.https.onRequest(app);
