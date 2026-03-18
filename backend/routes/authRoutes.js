const express = require("express");
const jwt =require("jsonwebtoken");
const authenticateToken = require("../middleware/authMiddleware");
const blacklist = require("../blacklist");
const router= express.Router();
const SECRET = "secretkey";

const USER = {

username: "admin",

password: "admin123"

};
router.post("/login", (req, res) => {

const { username, password } = req.body;

if (username !== USER.username || password !== USER.password) {

return res.status(401).json({ message: "Invalid credentials" }); 
}

const token = jwt.sign(

{ username: USER.username, loginTime: new Date() },
SECRET,
{ expiresIn: "1h" }
);
res.status(200).json({ token });

});

router.get("/profile", authenticateToken, (req, res) => {

res.status(200).json({
username: req.user.username,
loginTime: req.user.loginTime,
message: `Welcome ${req.user.username}`

});

});

router.post("/logout", authenticateToken, (req, res) => {

const token =req.headers["authorization"].split(" ")[1];
blacklist.add(token);
res.status(200).json({
message: "Logged out successfully"
});
});
module.exports = router;