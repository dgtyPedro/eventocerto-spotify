import { Request, Response } from "express";
import querystring from "querystring";

require("dotenv").config();

export const scope = "user-read-private user-read-email user-top-read";

export const clientToken =
  (process.env.CLIENT_ID || "") + ":" + (process.env.CLIENT_SECRET || "");

export const callback = async (req: Request, res: Response) => {
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
        Authorization: "Basic " + Buffer.from(clientToken).toString("base64"),
      },
    });

    const result: any = await response.json();

    res.redirect(
      "/api/v1/user?" +
        querystring.stringify({
          access_token: result.access_token,
        })
    );
  }
};
