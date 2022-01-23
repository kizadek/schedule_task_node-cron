const errorHandler = (err,req,res,next) =>{
    console.log(`ERROR ${err}`.blue)
    return res.status(500).send("sorry there was aploblem")
}

module.exports = errorHandler;