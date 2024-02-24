const mongoose = require("mongoose");
const Loginschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
 
});
var data = mongoose.model("login_tbs", Loginschema);
module.exports = data;
