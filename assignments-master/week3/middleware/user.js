const {JWT_KEY}=require("../config")
const jwt=require("jsonwebtoken")
function userMiddleware(req, res, next) {
    
    const token=req.headers.authorization
    const words=token.split(" ")//sepreating bearer from the auth code
    const jwt_token = words[1]
    const decoded=jwt.verify(jwt_token,JWT_KEY)
    //ideally we should check if user is admin or norml user by adding one more field( if (decoded.type==admin && decode.username="somethng"))
    if(decoded.username){
        next()
    }else{
        res.status(403).json({
            msg:"Not authenticated"
        })
    }
}

module.exports = userMiddleware;