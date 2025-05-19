import SettingModel from "../Model/settingModel.js";
import userModel from "../Model/UserModel.js";
import nodemailer from 'nodemailer'

export const createAddUpdateNavList = async (req, res) => {
  try {
    const { userId, navList } = req.body;

    // if (!Array.isArray(navList)) {
    //   return res.status(400).json({ error: "navList must be an array" });
    // }

    const result = await SettingModel.findOneAndUpdate(
      { userId },
      { navList },
      { new: true, upsert: true } // Return updated doc, create if not found
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNavList = async (req, res) => {
  try {
    const { userId } = req.body;

    const result = await SettingModel.find({ userId });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// export const setBgUrl = async (req, res) => {
//   try {
//     const { userId, bgUrl } = req.body;

//     const result = await userModel.findByIdAndUpdate(
//       userId,
//       { bgUrl: bgUrl },
//       { new: true, upsert: true }
//     );

//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const getBgUrl = async (req, res) => {
//   try {
//     const { userId } = req.body;

//     const result = await userModel.findById(userId);

//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


export const setBgUrl = async (req, res) => {
  try {
    const { userId, bgUrl } = req.body;

    // Validate input
    if (!userId || !bgUrl) {
      return res.status(400).json({ error: "userId and bgUrl are required." });
    }

    const result = await userModel.findByIdAndUpdate(
      userId,
      { bgUrl: bgUrl },
      { new: true, upsert: true } // upsert creates a new document if no match is found
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getBgUrl = async (req, res) => {
  try {
    const { userId } = req.body;

    // Validate input
    if (!userId) {
      return res.status(400).json({ error: "userId is required." });
    }

    const result = await userModel.findById(userId);

    if (!result) {
      return res.status(404).json({ error: "User  not found." });
    }

    // Return only the bgUrl
    res.status(200).json({ bgUrl: result.bgUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const sendReferral = async (req, res) => {
  try {
    const { email,referralCode } = req.body;

    console.log(">>>>>>>>>>>>>>>",email,referralCode)

    const auth = nodemailer.createTransport({
      service: "gmail",
      secure:true,
      port:465,
      auth:{
        user: "jangirsumit1011@gmail.com",
        pass: "mqcc ruzs eflh mjrl"
      }
    });
  
    const receiver = {
      from:"jangirsumit1011@gmail.com",
      to: `${email}`,
      subject: "Referral code",
      text: `Your referral code :- ${referralCode}`
    }
  
    auth.sendMail(receiver, (error, emailResponse)=>{
      console.log("thfgv")
      if(error)
        return res.status(400).json({error:error})
      
      res.json({message:emailResponse})

    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getReferredUsers = async (req, res) => {
  try {
    const { email, referralCode } = req.body;
    console.log(">>>>>>>>",email,referralCode)

    const users = await userModel.aggregate([
      // Step 1: Lookup the users with the same referralCode as refCode
      {
        $lookup: {
          from: 'users', // Same collection to reference
          localField: 'referralCode', // Current user's referralCode
          foreignField: 'refCode', // Other users' refCode
          as: 'referredUsers', // Output field containing the matching referred users
        },
      },
      // Step 2: Filter to include only the current user and those whose refCode matches referralCode
      {
        $match: {
          referralCode: referralCode, // Ensure we're looking for the correct user's referralCode
        },
      },
      // Step 3: Project the data to include current user and referred users
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          referralCode: 1,
          refCode: 1,
          referredUsers: 1, // Include referred users in the response
        },
      },
    ]);

    // Send a response with both the referral email sent and the matching users found
    res.status(200).json({
      message: `Referral code sent to ${email}`,
      referredUsers: users, // List of users with matching referralCode and refCode
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
