const express = require("express");

const cookieParser = require("cookie-parser");

const dotenv = require("dotenv");

const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());

app.use(cookieParser());

dotenv.config({ path: "../config.env" });

app.use(require("../routers/auth"));

require("../db/conn");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(port, () => {
  console.log(`server is running on port number ${port}`);
});
