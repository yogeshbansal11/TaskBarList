import mongoose from "mongoose";

const SettingSchema = new mongoose.Schema({
 
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  navList: {
    type: Array,
  },
});

const SettingModel = mongoose.model("setting", SettingSchema);

export default SettingModel; 
