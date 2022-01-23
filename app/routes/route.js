
const router = require("express").Router();
const {otp,otpVerification,userAccount,} = require("./../controllers/User");
const {verifyToken} =require("../middlewares/authJwt");

router.route("/phone")
        .post(otp)

router
    .route('/otpverification')
        .post([
            verifyToken
        ],otpVerification)

module.exports = router;