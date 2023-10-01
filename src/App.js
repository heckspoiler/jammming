import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home/Home";

// import ArtistPage from "./pages/ArtistPage/ArtistPage";
import "./App.css";
import ArtistPage from "./pages/ArtistPage/ArtistPage";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artists" element={<ArtistPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
