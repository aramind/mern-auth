const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authController = {
  signup: async (req, res, next) => {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    console.log(newUser);
    try {
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  signin: async (req, res, next) => {
    console.log("from signin controller");
    const { email, password } = req.body;

    try {
      const validUser = await User.findOne({ email });

      if (!validUser) return next(errorHandler(404, "User not found"));

      const validPassword = await bcryptjs.compare(
        password,
        validUser.password
      );

      if (!validPassword) return next(errorHandler(401, "Wrong credentials"));

      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

      // removing the password on the response object
      const { password: hashedPassword, ...rest } = validUser._doc;
      // Calculate the expiration date (one day from now)
      const oneDayInSeconds = 24 * 60 * 60; // 24 hours * 60 minutes * 60 seconds
      const expirationDate = new Date(Date.now() + oneDayInSeconds * 1000); // Convert seconds to milliseconds

      // Set the cookie with the calculated expiration date
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expirationDate,
        })
        .status(200)
        .json(rest);
    } catch (error) {
      next(error);
    }
  },
  google: async (req, res, next) => {
    console.log("google controller reached");
    console.log(req.body);
    try {
      const user = await User.findOne({ email: req.body.email });

      if (user) {
        console.log("user found");
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = user._doc;
        const expiryDate = new Date(Date.now() + 3600000);
        res
          .cookie("access_token", token, {
            httpOnly: true,
            expires: expiryDate,
          })
          .status(200)
          .json(rest);
      } else {
        console.log("creating user in else");
        const generatedPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User({
          username:
            req.body.name.split(" ").join("").toLowerCase() +
            Math.floor(Math.random() * 10000).toString(),
          email: req.body.email,
          password: hashedPassword,
          profilePicture: req.body.photo,
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password: hashedPassword2, ...rest } = newUser._doc;
        const expiryDate = new Date(Date.now() + 3600000);
        res
          .cookie("access_token", token, {
            httpOnly: true,
            expires: expiryDate,
          })
          .status(200)
          .json(rest);
      }
    } catch (error) {
      console.log("ERRRRR");
      console.log(error);
      next(error);
    }
  },
};

module.exports = authController;
