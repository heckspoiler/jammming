import React, { useState, useEffect } from "react";
import styles from "./Playlists.module.css";

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const fetchPlaylists = async () => {
    try {
      const response = await fetch("http://localhost:8000/playlists?limit=3");
      const data = await response.json();
      const allPlaylists = data.items;

      setPlaylists(allPlaylists);
      console.log(allPlaylists);
    } catch {
      console.error("Error fetching playlists from server.");
    }
  };
  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <div className="playlists landing-section">
      <h2 className="section-main-title">
        Favorite Playlists<span className="titlespan"></span>
      </h2>
      {playlists.map((playlist) => (
        <div key={playlist.id} className={styles.playlistField}>
          <img
            src={playlist.images[0].url}
            alt={playlist.name}
            className={styles.playlistImg}
          />
          <h3 className={styles.playlistTitle}>
            {playlist.name}
            <span className="titlespan"></span>
          </h3>
        </div>
      ))}
    </div>
  );
};

export default Playlists;
