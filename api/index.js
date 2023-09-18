const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));
const app = express();

const PORT = 3001;

app.listen(PORT, () => console.log(`running express server on port ${PORT}`));
