import React, { useState, useEffect } from "react";

const ArtistPage = () => {
  const [artists, setArtists] = useState([]);
  const fetchArtists = async () => {
    try {
      const response = await fetch("http://localhost:8000/artists");
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
    <div>
      {artists.map((artist) => (
        <div key={artist.id}>
          <h2>{artist.name}</h2>
          <img src={artist.images[1].url} alt={artist.name} />
        </div>
      ))}
    </div>
  );
};

export default ArtistPage;
