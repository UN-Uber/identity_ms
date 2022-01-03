const jwt = require("jsonwebtoken");
const { TokenExpiredError } = jwt;

const generateToken = (payload) => {
    const token = jwt.sign( payload , process.env.JWT_SECRET, { expiresIn: "3h" });
    const response = {
        token : token,
        generatedAt: new Date(),
        expiresIn: new Date(Date.now() + 3600000)
    }
	return response;
};


const verifyToken = (req, res, next) => {
	let token = req.headers["authorization"];
    if(!token){
        return res.status(403).send({ message: "No token provided!" });
    }
    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.verified = verified;
    }catch(err){
        if (err instanceof TokenExpiredError) {
            return res.status(401).send({ message: "Unauthorized! Access Token was expired!"});
        }
        return res.status(401).send({ message: "Unauthorized!: Invalid Token"});
    }
    next();
};

module.exports = { generateToken, verifyToken };