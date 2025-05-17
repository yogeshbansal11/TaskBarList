import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    conformPassword: {
      type: String,
    },
    expiryTime:{
      type: String,
    },
    bgUrl:{
      type: String,
    },
    referralCode:{
      type:String
    },
    refCode:{
      type:String
    }
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("User", userSchema);
