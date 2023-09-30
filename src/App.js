import React, { useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";

function App() {
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

  return (
    <div className="App">
      <NavBar />
      <button onClick={fetchArtists}>Fetch Artists</button>
      {artists.map((artist) => (
        <div key={artist.id}>
          <h2 className="artist-title">
            {artist.name}
            <span className="titlespan"></span>
          </h2>
          <img src={artist.images[2].url} alt={artist.name} />
        </div>
      ))}
    </div>
  );
}

export default App;
