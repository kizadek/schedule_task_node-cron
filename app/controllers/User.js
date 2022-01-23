require("dotenv").config({path:"../../config/config.env"})
const _=require("lodash");
const otpGenerater = require("otp-generator");
const jwt = require("jsonwebtoken");
const {hashfunction,compareData} =require("../util/hashFunction")
const {generateToken} = require("../util/generateJwt");

const {sendOTP} = require("../util/sendOtp")
//models
const Modle =require("../../database/models");


const asyncWrapper = require("../middlewares/asyncWrapper");


// otpin logic
const otp = asyncWrapper( async (req,res,next)=>{
    const {phone} = req.body
    if(!phone) return res.status(400).json({success: false, msg: "phone number is requred!"})

   const user = await Modle .User.findOne({where:{phone:phone}});
  // console.log(user)
  if(user) return res.status(400).json({success: false, msg:`${phone} is alredy linked to an account`})

  const OTP = otpGenerater.generate(6,{
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
     })
   //  console.log(OTP)
    

   //generate Toekn 
   const data  = {phone: phone}
   const expirtime = "30s"
   const otpToken  = await generateToken(data,expirtime)
   //console.log(otpToken)

   const body  =`${OTP} is your verification code `
   const line =phone
   // sendfunction
   const sent = await sendOTP(body,line);

   if(!sent) return res.status(400).json({success: false, msg: `sorry OTP could not be sent to ${line} try agian`})
     console.log(`OTP sent== ${sent}`)
   const hashedOtp = await hashfunction(OTP);
   //
   //console.log(hashedOtp)
       
    await Modle.Otp.create({ Phone: line, otp: hashedOtp})
       
   return res.status(200).json({
       success: true,
       token: otpToken,
       phone: line,
       "msg": "otp sent succesfully!!"
   })
   
   
})



const otpVerification = asyncWrapper(async (req,res,next)=>{
    //console.log(req.token)
    const priveteKey = process.env.JWT_TOKENKEY_SECRET
    const decoded = await jwt.verify(req.token,priveteKey)
    console.log("decoded data",decoded)
})

// // verify Otp / user account logic
const userAccount = asyncWrapper( async(req,res)=>{

})



module.exports={
    otp,
    otpVerification,
    userAccount
}