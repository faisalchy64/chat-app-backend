const signin = (req, res, next) => {
    res.send(req.body);
};

const signup = (req, res, next) => {
    res.send(req.body);
};

module.exports = { signin, signup };
