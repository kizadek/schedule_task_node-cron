const { Schema, model } = require("mongoose");

module.exports.Otp = model(
  "Otp",
  Schema(
    {
      phoneNumber: {
        type: String,
        required: true,
      },
      otp: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: 30 },
      },
      //After 5 minutes it will be deleted automatically from the database
    },
    { timestamps: true }
  )
);
