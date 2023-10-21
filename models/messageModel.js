const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        message: {
            type: String,
            required: [true, "Message is required"],
        },
        conversationId: {
            type: mongoose.Types.ObjectId,
            ref: "Conversation",
            required: [true, "Conversation id is required"],
        },
        sender: {
            _id: {
                type: mongoose.Types.ObjectId,
                ref: "User",
                required: [true, "Sender id is required"],
            },
            name: {
                type: String,
                required: [true, "Sender name is required"],
            },
            email: {
                type: String,
                required: [true, "Sender email is required"],
            },
        },
        receiver: {
            _id: {
                type: mongoose.Types.ObjectId,
                ref: "User",
                required: [true, "Receiver id is required"],
            },
            name: {
                type: String,
                required: [true, "Receiver name is required"],
            },
            email: {
                type: String,
                required: [true, "Receiver email is required"],
            },
        },
    },
    {
        timestamps: true,
    }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
