
const jwt=require("jsonwebtoken")


const authentication = async(req, res, next) => {
   
    if(!req.headers.authorization){
        return res.status(511).send("Authentication Failed, Please login again....")
    }
    const user_token = req.headers.authorization.split(" ")[1]
   
    await jwt.verify(user_token, "shhhhh", function(err, decoded) {
       
        if(err){
            return res.status(511).send("Authentication Failed, Please Login...")
        }
        req.body.userId=decoded.userId
        next()
    });
}

module.exports=authentication