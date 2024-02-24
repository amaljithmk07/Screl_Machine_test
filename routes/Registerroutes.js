const express = require("express");
const registerDB = require("../models/registerschema");
const bcrypt = require("bcryptjs");
const loginDB = require("../models/Loginschema");
const Registerroutes = express.Router();

Registerroutes.post("/", async (req, res) => {
  try {
    console.log(req.body.username);
    const username = req.body.username;
    const old_user = await loginDB.findOne({ username: username });
    if (old_user) {
      return res.status(200).json({
        success: false,
        error: true,
        message: "User already exist",
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const log = {
      username: req.body.username,
      password: hashedPassword,
    };
    const logresult = await loginDB(log).save();
    const reg = {
      login_id: logresult._id,
      name: req.body.name,
      bio: req.body.bio,
      phone: req.body.phone,
      age: req.body.age,
    };
    const regresult = await registerDB(reg).save();

    if (regresult) {
      return res.status(200).json({
        success: true,
        error: false,
        message: "Register Successful",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error",
      errormessage: err.message,
    });
  }
});

module.exports = Registerroutes;
