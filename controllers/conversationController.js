const Conversation = require("../models/conversationModel");

const getConversations = async (req, res, next) => {
    res.send("getConversations");
};

const getConversation = async (req, res, next) => {
    res.send("getConversation");
};

const postConversation = async (req, res, next) => {
    try {
        const { message, sender, receiver } = req.body;
        const conversation = await Conversation.findOne({
            $or: [
                { "sender._id": sender._id, "receiver._id": receiver._id },
                { "sender._id": receiver._id, "receiver._id": sender._id },
            ],
        });

        if (conversation) {
            const updatedConversation = await Conversation.updateOne(
                {
                    _id: conversation._id,
                },
                { message, sender, receiver }
            );

            res.send(updatedConversation);
        } else {
            const createdConversation = await Conversation.create({
                message,
                sender,
                receiver,
            });

            res.send(createdConversation);
        }
    } catch (err) {
        next({ message: "Sent message failed!" });
    }
};

module.exports = { getConversations, getConversation, postConversation };
