import React, { FunctionComponent, useState } from "react";
import Button from "./Button";

const Authorize: FunctionComponent = () => {
  const [spotifyAuthorized, setSpotifyAuthorized] = useState(false);

  const handleSpotifyAuthorizeButton = () => {
    const popUp = window.open(
      "http://localhost:5001/spotify-to-18a63/us-central1/api/spotify-authorize",
      "AUTHORIZE SPOTIFY",
      "width=500,height=600"
    );

    if (popUp) {
      popUp.onbeforeunload = function () {
        setSpotifyAuthorized(
          localStorage.getItem("sp-access-token") !== null &&
            localStorage.getItem("sp-refresh-token") !== null
        );
      };
    }
  };

  return (
    <div>
      <Button
        color="#04a777"
        disabled={spotifyAuthorized}
        onClick={handleSpotifyAuthorizeButton}
      >
        Spotify authorize
      </Button>
    </div>
  );
};

export default Authorize;
