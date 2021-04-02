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
  track: {
    name: string;
    artists: ArtistItem[];
  };
}

interface ArtistItem {
  name: string;
}

interface FormatedPlaylistTracks {
  name: string;
  artist: string;
}

const Home: FunctionComponent = () => {
  // const [selectedPlaylist, setSelectedPlaylist] = useState<string>();
  const [spotifyPlaylists, setSpotifyPlaylists] = useState<PlaylistItem[]>([]);
  const [playlistTracks, setPlaylistTracks] = useState<
    FormatedPlaylistTracks[]
  >([]);

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
            setPlaylistTracks(
              data.items.map((item) => {
                return {
                  name: item.track.name,
                  artist: item.track.artists.reduce(
                    (a, b, i) => a + (i !== 0 ? " " : "") + b.name,
                    ""
                  ),
                };
              })
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
      <pre>{JSON.stringify(playlistTracks, null, 2)}</pre>
    </div>
  );
};

export default Home;
