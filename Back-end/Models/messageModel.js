// messageModel.js

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // model
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // model
      required: true,
    },
    messageContent: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);
messageSchema.index({ messageContent: "text" });
const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
