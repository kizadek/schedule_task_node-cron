const bcrypt = require("bcrypt")

//@ function for hashing user password

exports. hashfunction = async (data, saltRounds = 10) => {

    try {
       // Generate a salt
     const salt = await bcrypt.genSalt(saltRounds); 
     // Hash password
     return await bcrypt.hash(data,salt);
    } catch (error) {
        console.log(`ERROR:: ${error}`)
    }
     //return null if error
     return null;

}

exports.compareData = async (data,hash ) =>{
    try {
        // compareData
        return await bcrypt.compare(data,hash);
    } catch (error) {
        console.log(`EORROR:: ${error}`)
    }
    // return false if error
    return false
}