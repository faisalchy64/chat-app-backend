const getConversations = async (req, res, next) => {
    res.send("getConversations");
};

const getConversation = async (req, res, next) => {
    res.send("getConversation");
};

const postConversation = async (req, res, next) => {};

module.exports = { getConversations, getConversation, postConversation };
