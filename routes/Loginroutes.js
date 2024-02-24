const express = require("express");
const Loginroutes = express.Router();
const bcrypt = require("bcryptjs");
const loginDB = require("../models/Loginschema");
const jwt = require("jsonwebtoken");
require('dotenv').config()

Loginroutes.post("/login", async (req, res) => {
  try {
    const username = req.body.username;

    if (username && req.body.password) {
      const old_user = await loginDB.findOne({
        username: username,
      });
      if (!old_user) {
        return res.status(400).json({
          success: true,
          error: false,
          message: "User does not exist",
        });
      }

      const passwordcheck = await bcrypt.compare(
        req.body.password,
        old_user.password
      );
      if (!passwordcheck) {
        return res.status(400).json({
          success: true,
          error: false,
          message: "Incorrect Password",
        });
      }

      const token = jwt.sign(
        {
          userId: old_user._id,
          userName: old_user.username,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        success: true,
        error: false,
        token: token,
        message: "Login Successful",
      });
    } else
      (err) => {
        return res.status(400).json({
          success: false,
          error: true,
          message: "All fields are required",
          errormessage: err.message,
        });
      };
  } catch (err) {
    return res.status(500).json({
      success: true,
      error: false,
      message: "Internal server error",
      errormessage: err.message,
    });
  }
});

module.exports = Loginroutes;
