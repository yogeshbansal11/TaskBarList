import userModel from "../Model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import moment from "moment";
dotenv.config();

const secretKey = process.env.secretKey;

// update
export const signUp = async (req, res) => {
  try {
    const { name, email, password, conformPassword, refCode } = req.body;

    if (!(name && email && password && conformPassword)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== conformPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const randomNumbers = Math.floor(10 + Math.random() * 90);
    const referralCode = name.substring(0, 2).toUpperCase() + randomNumbers;

    const expirationDate = moment().add(16, "days").toISOString();

    const userData = {
      name,
      email,
      password: hash,
      expiryTime: expirationDate,
      referralCode,
      ...(refCode && { refCode }), 
    };

    const newUser = new userModel(userData);
    await newUser.save();

    res.status(201).json({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      referralCode: newUser.referralCode,
      refCode: newUser.refCode || null,
      expiryTime: newUser.expiryTime,
    });
  } catch (error) {
    console.error("Error in signUp:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Email not found! Please signup" });
    }
    const dbPassword = user.password;

    const matchData = await bcrypt.compare(password, dbPassword);

    console.log("<<<<<match>>>>>", matchData);
    if (!matchData) {
      return res.status(400).json({ message: "invalid password" });
    }

    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "1h" });

    console.log("<<<<<token>>>>>>", token);

    return res
      .status(200)
      .json({ token, _id: user._id, message: "user login successfully" });
  } catch (error) {
    console.log("login");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const setreferralCode = async (req, res) => {
  try {
    const { userId } = req.body;

    // const user = await userModel.findOne({ _id:userId });
    // if (!user) {
    //   return res.status(400).json({ message: "user not found! Please signup" });
    // }

    const result = await userModel.findByIdAndUpdate(
      userId,
      { referralCode: referralCode },
      { new: true, upsert: true }
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { userId } = req.body;

    // const user = await userModel.findOne({ _id:userId });
    // if (!user) {
    //   return res.status(400).json({ message: "user not found! Please signup" });
    // }

    const result = await userModel.findById(userId);

    if (!result) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { userId, newPassword } = req.body;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, salt);

    user.password = hash;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const expiryTime = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);

    const now = moment();
    const expiry = moment(user.expiryTime);
    const daysLeft = expiry.diff(now, "days");

    res.status(200).json(daysLeft);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateName = async (req, res) => {
  const { userId, newName } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    user.name = newName;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
