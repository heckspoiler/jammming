import React, { useState } from "react";
import "./App.css";

function App() {
  const [artists, setArtists] = useState([]);
  const fetchArtists = async () => {
    try {
      const response = await fetch("http://localhost:8000/artists");
      const data = await response.json();
      const allArtists = data.items;

      setArtists(allArtists);
    } catch {
      console.error("Error fetching artists from server.");
    }
  };

  return (
    <div className="App">
      <button onClick={fetchArtists}>Fetch Artists</button>

      {artists.map((artist) => (
        <div key={artist.id}>
          <h2>{artist.name}</h2>
          <img src={artist.images[1].url} alt={artist.name} />
        </div>
      ))}
    </div>
  );
}

export default App;
