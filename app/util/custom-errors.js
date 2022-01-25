class customApiError  extends Error {
  constructor (message,statusCode){
      super(message)
      this.status = statusCode
  }
}

const createCustomError = (msg,statusCode) =>{
   return new customApiError(msg,statusCode);
}


module.exports = {
    customApiError,
    createCustomError
}