require("dotenv").config();

const express = require("express");
const axios = require("axios");

const queryString = require("node:querystring");
const app = express();
const PORT = 3001;

const SPOTIFY_ID = process.env.SPOTIFY_ID;
const SPOTIFY_KEY = process.env.SPOTIFY_KEY;
const encodedCredentials = Buffer.from(SPOTIFY_ID + ":" + SPOTIFY_KEY).toString(
  "base64"
);

app.get("/", (req, res) => {
  res.send(
    "<a href='https://accounts.spotify.com/authorize?client_id=" +
      process.env.SPOTIFY_ID +
      "&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Faccount&scope=user-top-read'>Sign in</a>"
  );
});

app.get("/callback", async (req, res) => {
  try {
    const spotifyResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      queryString.stringify({
        grant_type: "authorization_code",
        code: SPOTIFY_KEY,
        redirect_uri: "http://localhost:3001/callback",
      }),
      {
        headers: {
          Authorization: "Basic " + encodedCredentials,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log(spotifyResponse.data);
  } catch (error) {
    console.error("Error fetching token from Spotify:", error.response.data);
    res.status(500).send("Error fetching token from Spotify.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(SPOTIFY_ID);
});
