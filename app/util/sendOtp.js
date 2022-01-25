require("dotenv").config("../../config/config.env");

const accountId = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioline = process.env.TWILIO_PHONE_NUMBER;

const client = require("twilio")(accountId,authToken);


exports. sendOTP = async (body,to) =>{
    try {
        await client.messages.create({
            body,
            to,
            from: twilioline
        });
        return true
    } catch (error) {
        console.log(`ERROR:: ${error}`.italic);
        console.log(error)
    }

    //if error return false
    return false
}