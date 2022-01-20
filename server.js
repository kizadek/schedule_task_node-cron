
const express =require("express");
const morgan = require("morgan");
require("colors")
require('dotenv').config({path:"./config/config.env"})

const app = express();
app.use(express.json());

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
//middlewares

//mount routes
const PORT = process.env.PORT
const server = app.listen(PORT,console.log(`server is runing on Port:: ${PORT}....`.cyan));

process.on("unhandledRejection",(err,promis)=>{
    console,log(`ERROR:: ${err}`)
    server.close(()=>process.exit(1))
})