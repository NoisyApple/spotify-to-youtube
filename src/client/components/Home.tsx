import axios from "axios";
import React, { FunctionComponent, useEffect, useState } from "react";

interface PlaylistList {
  href: string;
  items: PlaylistItem[];
}

interface PlaylistItem {
  name: string;
  id: string;
  href: string;
}

interface TracksList {
  items: TrackItem[];
}

interface TrackItem {
  track: { name: string };
}

const Home: FunctionComponent = () => {
  // const [selectedPlaylist, setSelectedPlaylist] = useState<string>();
  const [spotifyPlaylists, setSpotifyPlaylists] = useState<PlaylistItem[]>([]);
  const [content, setContent] = useState<string>();

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

  const handlePlaylistChange = (value: string) => {
    if (value && value !== "None") {
      // setSelectedPlaylist(value);

      const spToken = localStorage.getItem("spotify-access-token") as string;

      axios({
        method: "GET",
        url: `${value}/tracks`,
        headers: {
          Authorization: `Bearer ${spToken}`,
        },
      })
        .then((r) => {
          if (r.data) {
            const data = r.data as TracksList;
            console.log(data);
            setContent(
              JSON.stringify(
                data.items.map((item) => {
                  return item.track.name;
                }),
                null,
                2
              )
            );
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div>
      <select
        onChange={(e) => handlePlaylistChange(e.target.value)}
        onBlur={(e) => handlePlaylistChange(e.target.value)}
      >
        <option>None</option>
        {spotifyPlaylists.map((pItem) => (
          <option key={pItem.id} value={pItem.href}>
            {pItem.name}
          </option>
        ))}
      </select>
      <pre>{content}</pre>
    </div>
  );
};

export default Home;
