const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const animeRouter = require("./anime/anime.router")

const app = express();

app.use(cors());
app.use(express.json());

app.use("/anime", animeRouter);


app.use(notFound);
app.use(errorHandler);

module.exports = app;