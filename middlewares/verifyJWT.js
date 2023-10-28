const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
    const { authorization } = req.headers;

    if (authorization) {
        const accessToken = authorization.split(" ")[1];
        jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(403).send({ message: "Forbidden access" });
            } else {
                if (decoded) {
                    res.decoded = decoded;
                    next();
                }
            }
        });
    } else {
        res.status(401).send({ message: "Unauthorized access" });
    }
};

module.exports = verifyJWT;
