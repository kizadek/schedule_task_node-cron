const express = require("express");
require("dotenv").config({ path: "./config/config.env" });
const morgan = require("morgan");
const connectDB = require("./db/connectdb");
const uri = process.env.MONGODB_URI;
//console.log(uri);
// PORT
const PORT = process.env.PORT || 5000;
// initialize an express app
const app = express();

// json body passer
app.use(express.json());

//set looger
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

//mount Routes
app.use("/api/v1/users", require("./routes/userRouter"));
//test server state
app.get("/test", (req, res) => {
  return res.status(200).send("<h1>Server is GOOOD🏋️🟢😊</h1>");
});
// 404
// app.all("*", (req, res) => {
//   return res.status(404).json({
//     sucesses: false,
//     msg: "sorry 🤷‍♀️😞 there is a problem with your end point",
//   });
// });
// setting up connections
const start = async () => {
  try {
    await connectDB(uri);
    const server = app.listen(
      PORT,
      console.log(`server is runing on port:${PORT}....`)
    );
    //unhundled promis rejection
    process.on("unhandledRejection", (error, promis) => {
      //close server
      console.log(`ERROR::${error}`);
      server.close(() => process.exit(1));
    });
  } catch (error) {
    console.log(error);
  }
};

start();
