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
};

module.exports = authController;
