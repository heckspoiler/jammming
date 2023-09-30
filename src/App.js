import React, { useState } from "react";

import "./App.css";

function App() {
  const [artists, setArtists] = useState([]);

  const fetchArtists = async () => {
    try {
      const response = await fetch("http://localhost:8000/callback");
      const data = await response.json();
      const allArtists = data.items;

      setArtists(allArtists);
    } catch {
      console.error("Error fetching artists from server.");
    }
  };
  return <div className="App"></div>;
}

export default App;
