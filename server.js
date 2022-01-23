
const express =require("express");
const morgan = require("morgan");
require("colors");
require('dotenv').config({path:"./config/config.env"});
const errorHandler = require("./app/middlewares/error-handler");

const app = express();
app.use(express.json());

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
//middlewares
app.use("/api/v1/",require("./app/routes/route"))

app.use(errorHandler);

app.get("/test",(req,res)=>{ss
    res.status(200).send("server is Good🏋️😊")
})
app.all("*",(req,res)=>{
    res.status(404).send('sorry end point not found!!')
})

//mount routes
const PORT = process.env.PORT
const server = app.listen(PORT,console.log(`server is runing on Port:: ${PORT}....`.cyan));

process.on("unhandledRejection",(err,promis)=>{
    console,log(`ERROR:: ${err}`)
    server.close(()=>process.exit(1))
})