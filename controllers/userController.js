const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const signin = async (req, res, next) => {
    res.send(req.body);
};

const signup = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        const password = await bcrypt.hash(req.body.password, 10);

        if (password) {
            const user = await User.create({ name, email, password });

            if (user) {
                res.status(201).send({ message: "User created successfully" });
            }
        }
    } catch (err) {
        next({ common: { msg: err.message } });
    }
};

module.exports = { signin, signup };
