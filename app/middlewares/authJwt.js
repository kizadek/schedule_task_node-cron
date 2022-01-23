
// FORMAT OF TOKEN
//Authorization: Bearer <access_token>

// Verify Token

exports. verifyToken = (req,res,next) =>{
    const errors = []
    // retrieve authoration header
    const bearerHeader = req.headers['authorization']
    //console.log("Token", bearerHeader)
    if(typeof bearerHeader !== 'undefined'){
        //remove token using the split function
        // split at space
        const Token = bearerHeader.split(" ")[1];
       // console.log(Token);
       if(typeof Token == "undefined"){
            errors.push({
            message: "no token provided plase provide a token to access end-pints NOT AUTHORIZED"
           })
       }else{
        req.token = Token
        next()
       }  
    }else{
        //No authorization header exists in the incoming
        // return not authorized and throw a new error
        errors.push({
            message: "no token provided plase provide a token NOT AUTHORIZED 2 "
        })
    }
   if(errors.length !==0) return res.status(403).json({success: false, errors})
}