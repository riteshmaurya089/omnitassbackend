const jwt =require("jsonwebtoken");
const blacklist = require("../blacklist");
const SECRET="secretkey";

const authenticateToken=(req,res,next)=>{
    const authHeader=req.headers["authorization"];

    if(!authHeader){
        return res.status(401).json({message:"Token missing"});
    }
    const token=authHeader.split(" ")[1];

    if(blacklist.has(token)){
        return res.status(403).json({message:"Token blacklisted" });
    }
    jwt.verify(token, SECRET, (err, user) => {

if (err) {
    return res.status(401).json({ message: "Invalid or expired token" });

}
req.user = user;
next();
    });
};
module.exports = authenticateToken;