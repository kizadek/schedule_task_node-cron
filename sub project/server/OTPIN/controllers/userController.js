const bcrypt = require("bcrypt");
const _ = require("lodash");
const axios = require("axios");
const otpGenerator = require("otp-generator");

const { sendOTP } = require("../util/sendOTP");

//models
const { User } = require("../db/model/userModel");
const { Otp } = require("../db/model/otpModel");
// signUp 833260
const signUp = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;
    const user = await User.findOne({
      phoneNumber,
    });
    if (user) return res.status(400).send("user aleady registered!");
    const OTP = otpGenerator.generate(6,{
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const Body = ` ${OTP} is your verification code`;
    const line = `+260${phoneNumber}`;
    const sent = sendOTP(Body, line);
    console.log(sent);

    console.log(OTP);
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(OTP, salt);
    const otp = new Otp({ phoneNumber, otp: hashedOtp });
    // save to mongodb
    const result = await otp.save();
    return res
      .status(200)
      .json({ sucesses: true, msg: "Otp sent successfully!", OTP: OTP });
  } catch (error) {
    console.log(error);
  }
};

// verifyOtp
const verifyOtp = async (req, res, next) => {
  const { phoneNumber, otp } = req.body;
  try {
    const otpHolder = await Otp.findOne({
      phoneNumber,
    });
    console.log(otpHolder);
    if (!otpHolder) return res.status(400).json("you used an expired OTP!");
    //console.log(otpHolder.otp);
    const hashedOtp = otpHolder.otp;
    const isValide = await bcrypt.compare(otp, hashedOtp);
    console.log(isValide);
    if (!isValide)
      return res
        .status(400)
        .json({ sucesses: false, msg: "you provided a wrong OTP!" });
    const number = otpHolder.phoneNumber;
    const user = new User({ phoneNumber: number });
    const token = user.generateJWT();
    const result = await user.save();
    const OTPDelete = await Otp.deleteMany({
      phoneNumber: number,
    });
    return res.status(200).json({
      sucesses: true,
      msg: "User Registration Successful!",
      token: token,
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signUp,
  verifyOtp,
};
