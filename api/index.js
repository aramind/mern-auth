const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user.route");
dotenv.config();

const app = express();
const PORT = 3001;

// Routers
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`running express server on port ${PORT}`));
