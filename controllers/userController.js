const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            const compare = await bcrypt.compare(password, user.password);

            if (compare) {
                const { _id, name, email } = user;
                const accessToken = jwt.sign(
                    { _id, email },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                );

                if (accessToken) {
                    res.send({ _id, name, email, accessToken });
                }
            } else {
                res.status(401).send({ message: "Password was wrong" });
            }
        } else {
            res.status(401).send({ message: "User not found" });
        }
    } catch (err) {
        next({ message: "User signin failed!" });
    }
};

const signup = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        const password = await bcrypt.hash(req.body.password, 10);

        if (password) {
            const user = await User.create({ name, email, password });

            if (user) {
                const { _id, name, email } = user;
                const accessToken = jwt.sign(
                    { _id, email },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                );

                res.status(201).send({ _id, name, email, accessToken });
            }
        }
    } catch (err) {
        next({ message: "User signup failed!" });
    }
};

module.exports = { signin, signup };
