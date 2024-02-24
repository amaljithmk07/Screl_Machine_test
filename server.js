const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Registerroutes = require("./routes/Registerroutes");
const Loginroutes = require("./routes/Loginroutes");
const Userroutes = require("./routes/Userroutes");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log("DataBase connected");
  })
  .catch((err) => {
    console.log(err);
  });

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api/register", Registerroutes);
server.use("/api/login", Loginroutes);
server.use("/api/user", Userroutes);

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
