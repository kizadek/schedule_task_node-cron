const {customApiError} = require("../util/custom-errors");

const errorHandler = (err,req,res,next) =>{
   // console.log(`ERROR ${err}`.blue)
    if(err instanceof  customApiError ) return res.status(err.status).json({success: false,msg:err.message});
    
    return res.status(500).send("sorry there was aploblem")
}

module.exports = errorHandler;