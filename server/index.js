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
console.log("outisde", accessToken);

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
    accessToken = spotifyResponse.data.access_token;

    res.send(
      `<h1 style="font-family: Arial; color: red;">Authentication successful! You can now access your top artists.</h1>
      <h2>${accessToken}</h2>
      `
    );
  } catch (error) {
    console.error("Error fetching token from Spotify:", error.response.data);
    res.status(500).send("Error fetching token from Spotify.");
  }
});

app.get("/artists", async (req, res) => {
  if (!accessToken) {
    return res.status(401).send("Not authenticated, bitch.");
  }

  try {
    const userTopArtistsResponse = await axios.get(
      "https://api.spotify.com/v1/me/top/artists",
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(SPOTIFY_ID, process.env.REDIRECT_URI_DECODED);
});
