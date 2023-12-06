const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: String,
  name: String,
  email: String,
  isAdmin: Boolean,
  createdOn: Number,
});

const User = mongoose.model("user", userSchema);

const getUserByFilter = async function (params) {
  try {
    const record = await User.find(params).then((record, er) => {
      return record;
    });
  } catch (err) {
    console.log(err);
  }
};

const conversationSchema = new mongoose.Schema({
  _id: String,
  lastMessage: String,
  users: [{ type: userSchema }],
  lastMessageSentOn: Number,
  unReadCount: Number,
});

const Conversation = mongoose.model("conversations", conversationSchema);

const messageSchema = new mongoose.Schema({
  _id: String,
  body: String,
  senderId: String,
  recieverId: String,
  conversationId: String,
  createdOn: Number,
});

const Message = mongoose.model("messages", messageSchema);

exports = module.exports = { User, getUserByFilter, Conversation, Message };
