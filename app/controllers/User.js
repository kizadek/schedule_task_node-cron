require("dotenv").config({path:"../../config/config.env"})
const _=require("lodash");
const otpGenerater = require("otp-generator");
const jwt = require("jsonwebtoken");
const {hashfunction,compareData} =require("../util/hashFunction")
const {generateToken} = require("../util/generateJwt");
const{createCustomError} = require("../util/custom-errors")
const {sendOTP} = require("../util/sendOtp")

//models
const Modle =require("../../database/models");


const asyncWrapper = require("../middlewares/asyncWrapper");
const { json } = require("express/lib/response");


// otpin logic
const otp = asyncWrapper( async (req,res,next)=>{
    const {phone} = req.body
    if(!phone) return next (createCustomError("phone number is requred!",400))
   const user = await Modle .User.findOne({where:{phone:phone}});
  // console.log(user)

  if(user) return next(createCustomError(`${phone} is alredy linked to an account`,400))

  const OTP = otpGenerater.generate(6,{
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
     })
    console.log(OTP)
    

   //generate Toekn 
   const data  = {phone: phone}
   const expirtime = "300s"
   const otpToken  = await generateToken(data,expirtime)
   //console.log(otpToken)

   const body  =`${OTP} is your verification code `
   const line =phone
   // sendfunction
   const sent =  true //await sendOTP(body,line);ss

   if(!sent) return next(createCustomError(`sorry OTP could not be sent to ${line} try agian`,400))

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
    const {otp}= req.body;
    const priveteKey = process.env.JWT_TOKENKEY_SECRET
    const decoded = await jwt.verify(req.token,priveteKey,(err ,decoded)=>err ? "undefined" : decoded)
       
     if( decoded === "undefined") return next(createCustomError("sorry token expired request for a new OTP ", 400))
    //console.log("decoded data",decoded)
     //otp verification
     const {data} = decoded;
     //console.log(data.phone)
     const otpHolder = await Modle.Otp.findOne({
         where:{Phone: data.phone}
     })

     //new simple comlex logic
     /**
      * 
      * cron schedule task
      * */
     

     //console.log(otpHolder.otp);
     const hashedOtp = otpHolder.otp
    const isValide = await compareData(otp,hashedOtp);
    console.log("..............",isValide)
    if(!isValide) return next(createCustomError("you provided a wrong OTP!",400))

    return  res.status(200).json({success:true,phone: data.phone})
   
})

// // verify Otp / user account logic
const userAccount = asyncWrapper( async(req,res)=>{

})

const deletOtpData = asyncWrapper(async ( req,res,next)=>{
     await Modle.Otp.destroy({ truncate: true, where: {} })

   res.status(200).json({
       success: true,
       msg: `recodes deleted!!`
   })
})



module.exports={
    otp,
    otpVerification,
    userAccount,
    deletOtpData
}