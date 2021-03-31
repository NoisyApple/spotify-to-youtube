const express = require("express");
const axios = require("axios");
const { jsonToUrlEncoded } = require("./utils");

const PORT = process.env.PORT || 7777;
const app = express();

const SCOPES =
  "ugc-image-upload user-read-recently-played user-top-read user-read-playback-position user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative user-follow-modify user-follow-read user-library-modify user-library-read user-read-email user-read-private";
const CLIENT_ID = "00a1b9ba949f42a7a70d0cdf02b6aebe";
const CLIENT_SECRET = "bc30c8723abc463c85aba0af14fec33d";
const REDIRECT_URI = "http://localhost:7777/authorize-callback";

app.get("/spotify-authorize", (req, res) => {
  res.redirect(
    `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}${
      SCOPES ? `&scope=${encodeURIComponent(SCOPES)}` : ""
    }&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&state=${encodeURIComponent("SPOTIFY-SUCCESS")}`
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
          Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
      },
      data: jsonToUrlEncoded({
        grant_type: "authorization_code",
        code: req.query.code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    const requestedData = await axios({
      method: "GET",
      url: "https://api.spotify.com/v1/me/playlists",
      headers: {
        Authorization: `Bearer ${tokenResponse.data.access_token}`,
      },
    });

    res.send(`<pre>${JSON.stringify(requestedData.data, null, 2)}</pre>`);
  } catch (error) {
    console.log(
      `ERROR: ${error.response.status}, ${error.response.statusText}`
    );
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
