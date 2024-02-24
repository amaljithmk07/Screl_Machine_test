const express = require("express");
const checkAuth = require("../middle-ware/checkAuth");
const Userroutes = express.Router();
const registerDB = require("../models/registerschema");
const mongoose = require("mongoose");

Userroutes.get("/profile", checkAuth, async (req, res) => {
  await registerDB
    .aggregate([
      [
        {
          $lookup: {
            from: "login_tbs",
            localField: "login_id",
            foreignField: "_id",
            as: "results",
          },
        },
        {
          $unwind: {
            path: "$results",
          },
        },
        {
          $match: {
            login_id: new mongoose.Types.ObjectId(req.userData.userId),
          },
        },
        {
          $group: {
            _id: "$_id",
            name: {
              $first: "$name",
            },
            bio: {
              $first: "$bio",
            },
            phone: {
              $first: "$phone",
            },
            age: {
              $first: "$age",
            },
            username: {
              $first: "$results.username",
            },
          },
        },
      ],
    ])
    .then((data) => {
      res.status(200).json({
        success: true,
        error: false,
        message: "Profile view successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        error: true,
        message: "profile  view Unsuccessfull",
        ErrorMessage: err.message,
      });
    });
});

module.exports = Userroutes;
