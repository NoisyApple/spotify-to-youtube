import axios from "axios";
import React, { FunctionComponent, useEffect, useState } from "react";

interface PlaylistList {
  href: string;
  items: PlaylistItem[];
}

interface PlaylistItem {
  name: string;
  id: string;
}

const Home: FunctionComponent = () => {
  const [spotifyPlaylists, setSpotifyPlaylists] = useState<PlaylistItem[]>([]);

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
        // TODO: There must be a better way of managing these types.
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
      <select>
        <option>None</option>
        {spotifyPlaylists.map((pItem) => (
          <option key={pItem.id}>{pItem.name}</option>
        ))}
      </select>
      <pre>{JSON.stringify(spotifyPlaylists, null, 2)}</pre>
    </div>
  );
};

export default Home;
