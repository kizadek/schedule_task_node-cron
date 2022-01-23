const asyncWrapper = (fn) =>{
    return async (req,res,next) =>{
        try {
            await fn(req,res, next)
        } catch (err) {

            console.log(`Errors:: ${err}`.white)
            next(err)
        }
    }
}

module.exports = asyncWrapper;