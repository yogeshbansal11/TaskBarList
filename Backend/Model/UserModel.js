const mongoose = require("mongoose");

const userschema = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  expiryTime:{
    type: String,
  },
  username:{
    type: String,
    required: true,
    unique:true,
  }
})


module.exports = mongoose.model("User", userschema);