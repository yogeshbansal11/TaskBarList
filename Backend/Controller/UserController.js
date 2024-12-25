const usermodel = require("../Model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = "qwertyujhfdfgthyj";
const moment = require("moment");

const register = async (req, res) => {
  const { name, email, password, username} = req.body;

  try {
    if (!(name && email && password && username)) {
      return res.status(404).json({ message: "all fields are required" });
    }

    const userEmail = await usermodel.findOne({ email });
    if (userEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);


    //moment for expiry
    const loginTime = moment().toISOString();
    const expirationDate = moment(loginTime).add(14,"days").toISOString();
    const data = {
      name,
      email,
      password: hash,
      expiryTime: expirationDate,
      username
    };

    const user = new usermodel(data);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.log("User not saved", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userEmail = await usermodel.findOne({ email });
    console.log(">>>>>>>>>> :", userEmail);

    if (!userEmail) {
      return res.status(400).json({ message: "email not found" });
    }

    const dbpassword = userEmail.password;
    const match = await bcrypt.compare(password, dbpassword);

    if (!match) {
      return res.status(500).json({ message: "invalide password" });
    }

    const token = jwt.sign({ id: userEmail._id }, secretKey, {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .json({ token, _id: userEmail._id, message: "user Login successful" });
  } catch (error) {
    res.status(500).json({ message: " error in login user" });
  }
};

const forgetpassword = async (req, res) => {
  const { email, newpassword } = req.body;

  try {
    const user = await usermodel.findOne({ email });
    console.log(".........");
    if (!user) {
      return res.status(400).json({ message: "email not found" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newpassword, salt);

    user.password = hash;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};


const calculateDaysLeft = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await usermodel.findOne({ _id: userId });

    // console.log(">>expiryTime>>>>>>", user.expiryTime);

    const now = moment();
    const expiry = moment(user.expiryTime);
    const daysLeft = expiry.diff(now, "days");

    res.status(200).json(daysLeft);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const usernameupdate = async (req, res) => {
  const { userId,newusername } = req.body;

  try {
    const user = await usermodel.findOne({ _id:userId });
    if (!user) {
      return res.status(400).json({ message: "email not found" });
    }
    user.username = newusername;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { register, login, forgetpassword,calculateDaysLeft,usernameupdate };
