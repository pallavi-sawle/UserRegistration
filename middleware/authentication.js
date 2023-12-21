require("dotenv").config()
var jwt = require('jsonwebtoken');

const verifyToken=(req,res,next)=>{
      const token = req.header('Authorization');
      if(!token) {
        return res.status(403).send("A valid token is required to visit the url!!")
      } 
      try {
        let verify_token = jwt.verify(token,process.env.TOKEN_KEY)
        req.user=verify_token;
      }
      catch {
        return res.status(403).send("valid token is required to visit")
      }
      return next()
}
module.exports = verifyToken