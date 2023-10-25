const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user.route");
const authRoutes = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();

const app = express();
const PORT = 3001;

// middlewares

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Routers
app.use("/api/auth", authRoutes);
app.use(cookieParser());
app.use("/api/user", userRoutes);

// middleware to handle errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`running express server on port ${PORT}`));
