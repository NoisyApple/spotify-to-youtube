import axios from "axios";
import React, { FunctionComponent, useEffect, useState } from "react";

interface PlaylistList {
  href: string;
  items: [];
}

const Home: FunctionComponent = () => {
  const [spotifyPlaylists, setSpotifyPlaylists] = useState([]);

  useEffect(() => {
    const spToken = localStorage.getItem("spotify-access-token") as string;

    axios({
      method: "GET",
      url: "https://api.spotify.com/v1/me/playlists",
      headers: {
        Authorization: `Bearer ${spToken}`,
      },
    })
      .then((r) => {
        // TODO: It is probabbly a better way of managing these types.
        if (r.data) {
          const data = r.data as PlaylistList;
          setSpotifyPlaylists(data.items);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <pre>{JSON.stringify(spotifyPlaylists, null, 2)}</pre>
    </div>
  );
};

export default Home;
