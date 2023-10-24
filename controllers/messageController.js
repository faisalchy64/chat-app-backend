const Message = require("../models/messageModel");

const getMessages = async (req, res, next) => {
    try {
        const { id } = req.query;
        const messages = await Message.find({ conversationId: id });

        res.send(messages);
    } catch (err) {
        next({ message: "Get messages request failed." });
    }
};

module.exports = { getMessages };
