const {JWT_KEY}=require("../config")
const jwt=require("jsonwebtoken")
// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

    const token=req.headers.authorization
    const words=token.split(" ")//sepreating bearer from the auth code
    const jwt_token = words[1]
    const decoded=jwt.verify(jwt_token,JWT_KEY)
    if(decoded.username){
        next()
    }else{
        res.status(403).json({
            msg:"Not authenticated"
        })
    }

}

module.exports = adminMiddleware;