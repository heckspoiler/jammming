require("dotenv").config();
const cors = require("cors");
const express = require("express");
const axios = require("axios");

const queryString = require("node:querystring");
const app = express();
app.use(cors());
const PORT = 8000;

const SPOTIFY_ID = process.env.SPOTIFY_ID;
const SPOTIFY_KEY = process.env.SPOTIFY_KEY;
const encodedCredentials = Buffer.from(SPOTIFY_ID + ":" + SPOTIFY_KEY).toString(
  "base64"
);

app.get("/", (req, res) => {
  res.send(
    "<a href='https://accounts.spotify.com/authorize?client_id=" +
      process.env.SPOTIFY_ID +
      "&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fcallback&scope=user-top-read'>Sign in</a>"
  );
});

let accessToken;

app.get("/callback", async (req, res) => {
  try {
    const spotifyResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      queryString.stringify({
        grant_type: "authorization_code",
        code: req.query.code,
        redirect_uri: process.env.REDIRECT_URI_DECODED,
      }),
      {
        headers: {
          Authorization: "Basic " + encodedCredentials,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const spotifyData = spotifyResponse.data;
    accessToken = spotifyResponse.data.access_token;

    res.send(spotifyData); //getting the token and sending it to localhost 8000 frontend
  } catch (error) {
    console.error("Error fetching token from Spotify:", error.response.data);
    res.status(500).send("Error fetching token from Spotify.");
  }
});

app.get("/artists", async (req, res) => {
  if (!accessToken) {
    return res.status(401).send("Not authenticated, bitch.");
  }
  const limit = req.query.limit || 20;
  try {
    const userTopArtistsResponse = await axios.get(
      `https://api.spotify.com/v1/me/top/artists?limit=${limit}`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    res.send(userTopArtistsResponse.data);
  } catch (error) {
    console.error(
      "Error fetching top artists from Spotify:",
      error.response.data
    );
    res.status(500).send("Error fetching top artists from Spotify.");
  }
});

app.get("/playlists", async (req, res) => {
  if (!accessToken) {
    return res.status(401).send("Not authenticated, bitch");
  }
  const limit = req.query.limit || 20;
  try {
    const userTopPodcastsResponse = await axios.get(
      `https://api.spotify.com/v1/me/playlists?limit=${limit}`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    console.log(userTopPodcastsResponse.data);
    res.json(userTopPodcastsResponse.data);
  } catch (error) {
    console.error(
      "Error fetching top artists from Spotify:",
      error.response.data
    );
    res.status(500).send("Error fetching top artists from Spotify.");
  }
});

app.get("/tracks", async (req, res) => {
  if (!accessToken) {
    return res.status(401).send("Not authenticated, bitch");
  }
  const limit = req.query.limit || 200;
  try {
    const userTopTracksRespons = await axios.get(
      `https://api.spotify.com/v1/me/tracks?limit=${limit}`,
      {
        haders: {
          Athorization: "Bearer " + accessToken,
        },
      }
    );
    console.log(userTopTracksRespons.data);
    res.json(userTopTracksResponse.data);
  } catch (error) {
    console.error(
      "Error fetching top artists from Spotify:",
      error.response.data
    );
    res.status(500).send("Error fetching top artists from Spotify.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
