import React, { useState, useEffect } from "react";
import styles from "./Artists.module.css";

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const fetchArtists = async () => {
    try {
      const response = await fetch("http://localhost:8000/artists?limit=3");
      const data = await response.json();
      const allArtists = data.items;

      setArtists(allArtists);
      console.log(allArtists);
    } catch {
      console.error("Error fetching artists from server.");
    }
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  return (
    <div className="artists landing-section">
      <h2 className="section-main-title">
        Favorite Artists<span className="titlespan"></span>
      </h2>
      {artists.map((artist) => (
        <div key={artist.id} className={styles.artistsField}>
          <img
            src={artist.images[2].url}
            alt={artist.name}
            className={styles.artistImg}
          />
          <h3 className={styles.artistTitle}>
            {artist.name}
            <span className="titlespan"></span>
          </h3>
        </div>
      ))}
    </div>
  );
};

export default Artists;
