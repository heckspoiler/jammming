import { useState, useEffect } from "react";
import styles from "./Tracks.module.css";

const Tracks = () => {
  const [tracks, setTracks] = useState([]);

  const fetchTracks = async () => {
    try {
      const response = await fetch("http://localhost:8000/tracks?limit=3");
      const data = await response.json();
      const allTracks = data.items;

      setTracks(allTracks);
      console.log(allTracks);
    } catch {
      console.error("Error fetching tracks from server.");
    }
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  return (
    <div className="tracks landing-section">
      <h2 className="section-main-title">Favorite Tracks</h2>
      {tracks.map((track) => (
        <div key={track.id} className={styles.tracksField}>
          <img
            src={track.album.images[0].url}
            alt={track.name}
            className={styles.tracksImg}
          />
          <h3 className={styles.tracksTitle}>{track.album.name}</h3>
          <p>{track.album.artists[0].name}</p>
        </div>
      ))}
    </div>
  );
};

export default Tracks;
