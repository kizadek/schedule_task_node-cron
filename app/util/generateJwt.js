//verify Token, check User roles in database
require("dotenv").config({path:"../../config/config.env"});

const jwt  = require("jsonwebtoken");


const config = {
    secret:process.env.JWT_TOKENKEY_SECRET
}


//method gennerating a token 

exports. generateToken = async (data,expirTime) =>{
        
    const signingOptions = {
        expiresIn: expirTime,
        algorithm: "HS256"
    }
    
    try {
        return await jwt.sign({data},config.secret,signingOptions)
    } catch (error) {
        console.log(`ERROR:: ${error}`);
    }
    // if error return null
    return null;
}

