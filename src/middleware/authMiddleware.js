const jwt = require("jsonwebtoken");
const User = require("../models/User");
const expressAsyncHandler = require("express-async-handler");

const auth = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    console.log(req.headers);
    token = req?.headers?.authorization?.split(":")[1];
    // console.log("token" + token);
    try {
      console.log("TOKEN :: " + token);
      if (token) {
        const userID = jwt.verify(token, process.env.JWT_KEY);
        // console.log(userID);
        const user = await User.findById(userID?.id);
        req.user = user;
        console.log("No error");
        next();
      }
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  } else {
    console.log("Error");
    throw new Error("No token attached");
  }
});

module.exports = auth;
