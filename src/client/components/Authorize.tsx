import React, { FunctionComponent, useState } from "react";
import Button from "./Button";

const Authorize: FunctionComponent = () => {
  const [spotifyAuthorized, setSpotifyAuthorized] = useState(false);
  const [googleAuthorized, setGoogleAuthorized] = useState(false);

  const [tokenData, setTokenData] = useState({});

  const handleSpotifyAuthorizeButton = () => {
    const popUp = window.open(
      "http://localhost:5001/spotify-to-18a63/us-central1/api/spotify-authorize",
      "AUTHORIZE SPOTIFY",
      "width=500,height=600"
    );

    if (popUp) {
      popUp.onbeforeunload = function () {
        setSpotifyAuthorized(
          localStorage.getItem("spotify-access-token") !== null &&
            localStorage.getItem("spotify-refresh-token") !== null
        );

        updateTokenData();
      };
    }
  };

  const handleGoogleAuthorizeButton = () => {
    const popUp = window.open(
      "http://localhost:5001/spotify-to-18a63/us-central1/api/google-authorize",
      "AUTHORIZE GOOGLE",
      "width=500,height=600"
    );

    if (popUp) {
      popUp.onbeforeunload = function () {
        setGoogleAuthorized(
          localStorage.getItem("google-access-token") !== null &&
            localStorage.getItem("google-refresh-token") !== null
        );

        updateTokenData();
      };
    }
  };

  const updateTokenData = () => {
    const spToken = localStorage.getItem("spotify-access-token");
    const spRToken = localStorage.getItem("spotify-refresh-token");
    const gToken = localStorage.getItem("google-access-token");
    const gRToken = localStorage.getItem("google-refresh-token");

    setTokenData({ spToken, spRToken, gToken, gRToken });
  };

  return (
    <div>
      <Button
        color="#04a777"
        disabled={spotifyAuthorized}
        onClick={handleSpotifyAuthorizeButton}
      >
        Spotify Authorize
      </Button>
      <Button
        color="#3E92CC"
        disabled={googleAuthorized}
        onClick={handleGoogleAuthorizeButton}
      >
        Google Authorize
      </Button>
      <pre>{JSON.stringify(tokenData, null, 2)}</pre>
    </div>
  );
};

export default Authorize;
