import { Request, Response } from "express";
import { randomUUID } from "crypto";
import querystring from "querystring";
import { matchGenre } from "../utils/genres.util";
import { scope } from "../config/spotify.config";
import { Artist, NoOpErrorHandler, Page } from "@spotify/web-api-ts-sdk";

require("dotenv").config();

export const AuthUser = (_req: Request, res: Response) => {
  var state = randomUUID();

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
};

export const GetUser = async (req: Request, res: Response) => {
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

    const result: Page<Artist> = (await response.json()) as Page<Artist>;
    const listenedGenres: string[] = [];
    const listenedArtists: string[] = [];
    result.items.map((artist: Artist) => {
      listenedArtists.push(artist.name);
      artist.genres.map((genre: string) => {
        const parsedGenres = genre.replaceAll("-", " ").split(" ");
        for (var i = 0; i < parsedGenres.length; i++) {
          const parsedGenre = matchGenre(parsedGenres[i]);
          if (parsedGenre) {
            listenedGenres.push(parsedGenre);
            return;
          }
        }
      });
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
  } catch (error: any) {
    res.send(error.toString());
  }
};
