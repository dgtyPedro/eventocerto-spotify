import { AuthUser, GetUser } from "../services/user.service";

require("dotenv").config();
const express = require("express");

const router = express.Router();

router.route("/auth").get(AuthUser);

router.route("/").get(GetUser);

module.exports = router;
