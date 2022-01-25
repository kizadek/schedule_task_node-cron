require("dotenv").config("../config/config.env");

const accountsid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioLine = process.env.TWILIO_PHONE_NUMBER;

const client = require("twilio")(accountsid, authToken);

const sendOTP = async (body, to) => {
  try {
    await client.messages.create({
      body: body,
      to,
      from: "3534",
    });
    return true;
  } catch (error) {
    console.log(`ERROR::${error}`);
    return false;
  }
};

module.exports = {
  sendOTP,
};
