const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");

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
};

module.exports = authController;
