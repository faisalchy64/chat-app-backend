const Message = require("../models/messageModel");

const getMessages = async (req, res, next) => {
    try {
        const { id, page } = req.query;
        const skip = page > 1 ? (page - 1) * 10 : 0;

        const messages = await Message.find({ conversationId: id })
            .limit(10)
            .skip(skip);

        const total = await Message.find({ conversationId: id }).count();

        res.set({ "Access-Control-Expose-Headers": "*", Total: total }).send(
            messages
        );
    } catch (err) {
        next({ message: "Get messages request failed." });
    }
};

module.exports = { getMessages };
