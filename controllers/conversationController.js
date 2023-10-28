const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");

const getConversations = async (req, res, next) => {
    try {
        const { id } = req.query;
        const conversations = await Conversation.find({
            $or: [{ "sender._id": id }, { "receiver._id": id }],
        }).sort({ updatedAt: -1 });

        res.send(conversations);
    } catch (err) {
        next({ message: "Get conversations request failed." });
    }
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
            const updatedConversation = await Conversation.findOneAndUpdate(
                {
                    _id: conversation._id,
                },
                { message, sender, receiver },
                { new: true }
            );

            if (updatedConversation) {
                const { _id, message, sender, receiver } = updatedConversation;
                const createdMessage = await Message.create({
                    conversationId: _id,
                    message,
                    sender,
                    receiver,
                });
                io.emit("conversation", {
                    conversation: updatedConversation,
                    message: createdMessage,
                });
            }

            res.send(updatedConversation);
        } else {
            const createdConversation = await Conversation.create({
                message,
                sender,
                receiver,
            });

            if (createdConversation) {
                const { _id, message, sender, receiver } = createdConversation;
                const createdMessage = await Message.create({
                    conversationId: _id,
                    message,
                    sender,
                    receiver,
                });
                io.emit("conversation", {
                    conversation: createdConversation,
                    message: createdMessage,
                });
            }

            res.send(createdConversation);
        }
    } catch (err) {
        next({ message: "Sent message request failed." });
    }
};

module.exports = { getConversations, postConversation };
