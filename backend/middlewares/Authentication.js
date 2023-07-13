const jwt = require("jsonwebtoken");
require('dotenv').config();

const authentication = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        try {
            jwt.verify(token, process.env.SECRET, function (err, decoded) {
                console.log(decoded)
                if (decoded) {
                    req.headers.user = decoded.userExist;
                    next();
                } else {
                    res.send({ "msg": "Please login first" })
                }
            });
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }

    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }



};


module.exports = {
    authentication
}