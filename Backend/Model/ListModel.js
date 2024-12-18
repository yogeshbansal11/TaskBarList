const mongoose = require("mongoose");

const listSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  //add color
  color: {
    type: String,
    default: '#f9f9f9', // default color
  },
});

module.exports = mongoose.model("List", listSchema);
