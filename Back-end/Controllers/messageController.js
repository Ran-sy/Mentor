const Message = require("../Models/messageModel");
const User = require("../Models/userModel");

const createMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { messageContent } = req.body;
    const receiver = await User.findById(id);
    const sender = await User.findById(req.user.id);
    if (!receiver || !sender) {
      return res.status(404).send("user not found");
    }
    console.log('receiver', receiver.name, ', sender: ', sender.name)

    const newMessage = new Message({
      sender: req.user.id,
      receiver: receiver.id,
      messageContent,
    });

    const savedMessage = await newMessage.save()

    res.status(201).json(savedMessage);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const getMessageById = async (req, res) => {
  const _id = req.params.id;
  Message.findById(_id).populate("receiver")
    .sort({ _id: -1 }).limit(100)
    .populate({path: "sender", select: "-tokens",})
    .then((message) => {
      if (!message) {
        return res.status(404).send("message not found");
      }
      res.status(200).send(message);
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

const getReceiverMessages = async (req, res) => {
  try {
    const _id = req.params.id;

    const messages = await Message.find({ receiver: _id })
      .sort({ _id: -1 }).limit(100)
      .populate({path: "receiver sender", select: "-tokens",})
    res.status(200).json(messages);
  } catch (e) {
    res.status(500).send("Failed to retrieve messages"+ e.message);
  }
};


const getSenderMessages = async (req, res) => {
  try {
    const _id = req.params.id;

    const messages = await Message.find({ sender: _id })
      .sort({ _id: -1 }).limit(100)
      .populate({path: "receiver sender", select: "-tokens",})
    res.status(200).json(messages);
  } catch (e) {
    res.status(500).send("Failed to retrieve messages", e.message);
  }
};

const searchMessages = async (req, res) => {
  try {
    const { searchFor } = req.body;
    console.log(searchFor)


    const messages = await Message.find({ $text: { $search: searchFor } })
      .sort({ 'score': { '$meta': 'textScore' } }).limit(25)
      .populate({path: "receiver sender", select: "-tokens",})

    res.status(200).json(messages);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const searchMessagesByDate = async (req, res) => {
  try {
    const { searchFor } = req.body;
    console.log(searchFor)

    const messages = await Message.find({ $text: { $search: searchFor } })
      .sort({ _id: -1 }).limit(25)
      .populate({path: "receiver sender", select: "-tokens",})

    res.status(200).json(messages);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

module.exports = {
  createMessage,
  getReceiverMessages,
  getMessageById,
  getSenderMessages,
  searchMessages,
  searchMessagesByDate
};
