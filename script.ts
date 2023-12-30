import { Router, Request, Response } from "express";
import { randomUUID } from "crypto";
import { matchGenres } from "./genres";

require("dotenv").config();
const express = require("express");
const querystring = require("querystring");
const app = express();
const port = 3000;

app.get("/login", function (_req: Request, res: Response) {
  var state = randomUUID();
  var scope = "user-read-private user-read-email user-top-read";

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: process.env.CLIENT_ID || "",
        scope: scope,
        redirect_uri: "http://localhost:3000/callback",
        state: state,
      })
  );
});

app.get("/callback", async (req: Request, res: Response) => {
  const code = req.query.code || "";
  const state = req.query.state || null;

  if (state === null) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code.toString(),
        redirect_uri: "http://localhost:3000/callback",
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            (process.env.CLIENT_ID || "") +
              ":" +
              (process.env.CLIENT_SECRET || "")
          ).toString("base64"),
      },
    });

    const result: any = await response.json();

    console.log(result);

    res.redirect(
      "/user/info?" +
        querystring.stringify({
          access_token: result.access_token,
        })
    );
  }
});

app.get("/user/info", async (req: Request, res: Response) => {
  var accessToken = req.query.access_token || null;
  try {
    const response = await fetch(
      "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + (accessToken || ""),
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result: any = await response.json();
    const listenedGenres: string[] = [];
    const listenedArtists: string[] = [];
    result.items.map((artist: any) => {
      listenedArtists.push(artist.name);
      listenedGenres.push(...artist.genres);
      return {
        name: artist.name,
        genre: artist.genres,
      };
    });
    let genreCount: Record<string, number> = {};
    listenedGenres.map((genre: string) => {
      if (genre in genreCount) {
        genreCount[genre]++;
      } else {
        genreCount[genre] = 1;
      }
    });
    const genreCountArray: [string, number][] = Object.entries(genreCount);

    genreCountArray.sort((a, b) => b[1] - a[1]);

    const sortedListenedGenres: Record<string, string> = {};
    genreCountArray.forEach(([genre, count]) => {
      sortedListenedGenres[genre] =
        ((count * 100) / listenedGenres.length).toFixed(2) + "%";
    });

    const userInfo = {
      artists: listenedArtists,
      genres: sortedListenedGenres,
    };

    res.send(userInfo);

    matchGenres(Object.keys(userInfo.genres));
  } catch (error: any) {
    res.send(error.toString());
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
